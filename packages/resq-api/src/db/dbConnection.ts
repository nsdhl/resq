import mongoose from "mongoose";

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URL as string, { dbName: "RESQ" });
    console.log("Database connected");

  }
  catch (e) {
    console.log(e)
  }
}

export { dbConnection }; 
