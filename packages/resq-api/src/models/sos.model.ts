import { Schema, Types, model } from "mongoose";

interface ISoS {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  location: {
    type: String,
    coordinates: number[]
  };
}

const sosSchema = new Schema<ISoS>({
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number]
  },
})

export const SoS = model<ISoS>("SoS", sosSchema)
