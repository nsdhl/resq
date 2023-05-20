import mongoose, { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
  _id: Types.ObjectId;
  fullname: string;
  roles: [];
  username: string;
  password: string;
  comparePassword: (password: string) => boolean;
  createAccessToken: () => string;
}



const userSchema = new Schema<IUser>({
  fullname: {
    type: String,
    required: true
  },
  roles: {
    type: [],
    required: true,
  },

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

})

userSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(password: string) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
}

userSchema.methods.createAccessToken = function(): string {
  return jwt.sign(
    { userId: this._id, username: this.username },
    "jsdfhoejsiodfjicdnowkajodfjieJISODFJKjodfjksoquoerj",
    {
      expiresIn: "1d"
    }
  )
}

const User = model<IUser>("User", userSchema);
export default User
