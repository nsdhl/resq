import User from "../models/user.model";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, location, roles, password } = req.body;
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(401).json({
        error: "username already exists try again with different username",
      });
    }

    const user = new User({
      username,
      roles,
      location: {
        type: "Point",
        coordinates: location
      },
      password
    });

    await user.save();
    res.status(200).json({
      status: "success",
    })
  } catch (e) {
    return res.status(401).json({
      status: "error",
      message: e
    });
  }
};

/**
 * User login controller
  */

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
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
    res.status(403).json(e);
  }
};


























