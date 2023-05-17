import express from "express";
import {User } from "../models/user.model";
import {Request, Response} from "express";
// const bcrypt = require(bcrypt);

const createUser = async(req: Request, res:Response)=>{
    const { username, password } = req.body;

    try {
      // check if the user exists
      const user:any = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Invalid Username or Password" });
      }
  
      // Compare the provided password with the hashed password
  
      // const passwordMatch = await bcrypt.compare(password, user.password);
      // if (!passwordMatch) {
      //   return res.status(401).json({ message: "Invalid username and password" });
      // }
  
      // User authenticated, generate a token or session
      // ... Implement your authentication logic here ...
  
      res.status(200).json({ message: "Login Successful" });
    } catch (error) {
      res.status(500).json({ message: "An error occured" });
    }
}

export default createUser;