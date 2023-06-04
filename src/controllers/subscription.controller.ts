import { Response } from "express";
import { Subscription } from "../models/subscription.model";
import { AuthRequest } from "../typings/interface";

export const createSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("Unauthorized!")
    }

    const { userId } = req.user;

    await Subscription.create({
      user: userId,
      ...req.body
    });

    res.status(200).json("Success!")
  } catch (e) {
    console.log(e);
  }

}
