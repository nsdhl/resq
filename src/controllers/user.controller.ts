import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
export const createUser = async (req: Request, res: Response) => {
  const { username, fullname, roles, password, description } = req.body;

 
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.json({
      error: "email already exists try again with different email",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    username,
    fullname,
    roles,
    password:hashedPassword,
  });
  
  try {
    await user.save();
    res.status(201).send("user was created !!");
  } catch (e) {
    return res.send("error occured");
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username, password });
    if (userExists) {
      res.status(200).json({ success: "login successful" });
    }
  } catch (e) {
    res.status(403).json("sorry could not login ");
  }
};
