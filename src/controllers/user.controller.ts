import User from "../models/user.model";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  const { username, fullname, roles, password } = req.body;


  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.json({
      error: "email already exists try again with different email",
    });
  }

  const user = new User({
    username,
    fullname,
    roles,
    password
  });

  try {
    await user.save();
    res.status(201).send("user was created !!");
  } catch (e) {
    return res.send("error occured");
  }
};

/**
 * User login controller
  */

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    /* Check if user exists
      */
    if (!user) {
      return res.status(400).json({ failure: "User doesn't exist!" });
    }
    /**
     * Check if user password matches
     */
    const isMatched = await user.comparePassword(password);

    if (!isMatched) {
      return res.status(401).json({
        status: "failure",
        message: "Username or password didn't match!"
      })
    }

    /**
     * Create JWT access token
     */

    const token = user.createAccessToken();

    res.status(200).json({
      token,
      username,
      roles: user.roles
    })

  } catch (e) {
    res.status(403).json("sorry could not login ");
  }
};


























