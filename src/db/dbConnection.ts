import mongoose from "mongoose";

const dbConnection = () => {
    try{
        mongoose.connect(process.env.MONGO_URL as string);
        console.log("Database connected");
        
    }
    catch(e) {
        console.log(e)
    }
}

export {dbConnection}; 