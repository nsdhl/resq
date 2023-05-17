import mongoose, { Schema, Types, model } from "mongoose";

interface IUser {
    _id:Types.ObjectId;
    fullname:string, 
    isAdmin:boolean,
    description:string, 
    email:string, 
    password:string, 
}

const userSchema = new Schema<IUser>({
    fullname:{
        type:String, 
        required:true
    },
    isAdmin:{
        type:Boolean, 
        required:true, 
    },

    description:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    password:{
        type:String, 
        required:true
    }

})

const User = model<IUser>("User", userSchema);
export default User