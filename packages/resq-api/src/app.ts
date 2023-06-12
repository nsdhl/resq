import express, { Request, Response } from "express";
import http from "http";
import { dbConnection } from "./db/dbConnection";
import router from "./route";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { NotificationWorker } from "./process/worker";
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

dbConnection();

app.get("/", async (req: Request, res: Response) => {
  res.json("App is running");
});


app.use("/api", router);

new NotificationWorker();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
