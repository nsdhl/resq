import mongoose, { Schema, Types, model } from "mongoose";

type Keys = {
  p256dh: string;
  auth: string;
}

interface ISubscription {
  user: Types.ObjectId;
  endpoint: string;
  expirationTime: string;
  keys: Keys
}

const subscriptionSchema = new Schema<ISubscription>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  endpoint: String,
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String,
  }
})

export const Subscription = model<ISubscription>("Subscription", subscriptionSchema)

