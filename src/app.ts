import express, { Request, Response } from "express";
import http from "http";
import { dbConnection } from "./db/dbConnection";
import router from "./route";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json()); 

dbConnection();

app.get("/", (req: Request, res: Response) => {
  res.json("App is running");
});

app.use("/api", router);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
