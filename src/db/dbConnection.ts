import mongoose from "mongoose";

const dbConnection = () => {
    try{
        mongoose.connect("mongodb://localhost:27017/");
        console.log("Database connected");
        
    }
    catch(e) {
        console.log(e)
    }
}

export {dbConnection}; 