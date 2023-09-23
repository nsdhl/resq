import { Response } from "express";
import { Subscription } from "../models/subscription.model";
import { AuthRequest, IJwtPayload } from "../typings/interface";

export const createSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user as IJwtPayload;
    console.log("hello", userId)

    await Subscription.create({
      user: userId,
      ...req.body
    });

    res.status(200).json("Success!")
  } catch (e) {
    console.log(e);
  }

}
