import mongoose, { Schema, Types, model } from "mongoose";

interface IUser {
    _id:Types.ObjectId;
    fullname:string, 
    roles:[],
    username:string, 
    password:string, 
}



const userSchema = new Schema<IUser>({
    fullname:{
        type:String, 
        required:true
    },
    roles:{
        type:[], 
        required:true, 
    },

    username:{
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