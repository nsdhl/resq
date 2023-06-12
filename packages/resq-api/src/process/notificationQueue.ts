import { Queue } from "bullmq";

export const notificationQueue = new Queue("notification", {
  connection: {
    host: "localhost",
    port: 6379,
  }
})


