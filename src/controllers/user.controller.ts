import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
export const createUser = async (req: Request, res: Response) => {
  const { email, fullname, isAdmin, password, description } = req.body;

  const user = new User({
    email,
    fullname,
    isAdmin,
    password,
    description,
  });
  const usernameExists = await User.findOne({ email });
  if (usernameExists) {
    return res.json({
      error: "email already exists try again with different email",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  try {
    await user.save();
    res.status(201).send("user was created !!");
  } catch (e) {
    return res.send("error occured");
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email, password });
    if (userExists) {
      res.status(200).json({ success: "login successful" });
    }
  } catch (e) {
    res.send("sorry could not login ");
  }
};
