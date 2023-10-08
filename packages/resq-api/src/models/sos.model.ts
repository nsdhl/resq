import { Schema, Types, model } from "mongoose";

interface ISoS {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  location: {
    type: String,
    coordinates: number[]
  };
  description: string;
}

const sosSchema = new Schema<ISoS>({
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number]
  },
  description:{
    type:String,
  }
})

export const SoS = model<ISoS>("SoS", sosSchema)
