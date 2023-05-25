import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { dbConnection } from "./db/dbConnection";
import router from "./route";
import dotenv from "dotenv";
import webPush from "web-push";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey =
  "BMvebt0qgXK-KnVn2CfgeSo2D5rGFVhGl9ApOCRN2TAV85cmcRQOgeFKCNQaf5ZB2jMXFT7x73olhh9RZiHK8SM";
const privateVapidKey = "ft77F5BImR8ZUqcETMNES9OcGinYll9dBjwiTVB4JkI";

// webPush.setVapidDetails(
//   "mailto:test@test.com",
//   publicVapidKey,
//   privateVapidKey
// );

// Subscribe Route
app.post("/subscribe", (req: Request, res: Response) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  // webPush
  //   .sendNotification(subscription, payload)
  //   .catch((err) => console.error(err));
});

const notificationPort = process.env.NOTIFICATION_PORT;
const appPort = process.env.APP_PORT;

server.listen(appPort, () => {
  console.log(`Server started on port ${appPort}`);
});

app.use(express.json());
dbConnection();
app.use("/api", router);

// Socket.io event handlers
io.on("connection", (socket: Socket) => {
  console.log("A client connected");

  // Handle custom events
  socket.on("delete", (data: any) => {
    console.log("Received custom event:", data);
    function calculateDistance(){
      let distance = 7;
      socket.emit("distance", { data: `you are ${distance}km away from the disaster` });
  }
  calculateDistance();
    // Process the data or perform actions
  });
  // Handle disconnect event
 
});
// Example server-side code to emit a notification


//Routes
app.get("/", (req: Request, res: Response) => {
  res.status(404).json("App is running");
});
