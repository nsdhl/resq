import User from "../models/user.model";
import {Request, Response} from "express";

export const createUser = async(req:Request, res:Response)=>{

const {email, fullname, isAdmin, password, description} = req.body;

const user = new User({
    email, 
    fullname, 
    isAdmin, 
    password, 
    description
});
const usernameExists = await User.findOne({email});
if(usernameExists){
   return  res.json({error:"email already exists try again with different email"});
}

try{
    await user.save();
    res.status(201).send('user was created !!')
}
catch(e){
    return res.send("error occured");
}

}