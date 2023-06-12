import mongoose, { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
  _id: Types.ObjectId;
  fullname: string;
  roles: string[];
  location: {
    type: String,
    coordinates: number[]
  };
  username: string;
  password: string;
  comparePassword: (password: string) => boolean;
  createAccessToken: () => string;
}

const userSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number]
  },

  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

userSchema.methods.createAccessToken = function(): string {
  return jwt.sign(
    { userId: this._id, username: this.username, location: this.location, role: this.roles },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );
};

const User = model<IUser>("User", userSchema);
export default User;
