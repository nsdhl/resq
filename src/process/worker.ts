import { Job, Worker } from "bullmq";
import { getNearestUsers } from "../functions/getNearestUsers";
import webPush from "web-push";
import { Subscription } from "../models/subscription.model";

// type IVapidDetails = {
//   vapidDetails: {
//     subject: string;
//     publicKey: string;
//     privateKey: string;
//   }
// }


class NotificationWorker {
  constructor() {
    const worker: Worker = new Worker('notification', async (job: Job) => {
      // await job.updateProgress(job.data)
      const users = await getNearestUsers(job.data);

      const subscribedUsers = await Subscription.find({ user: users.map(el => el._id) }).select("-user")

      const options: any = {
        vapidDetails: {
          subject: 'Incident Notification',
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
      }

      subscribedUsers.map(async (el: any) => {
        try {
          await webPush.sendNotification(
            el,
            JSON.stringify({
              title: 'Hello from server',
              description: 'this message is coming from the server',
              image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
            }),
            options
          )
        } catch (error) {
          console.log(error);
        }
      })
      return users;
    }, {
      connection: {
        host: "localhost",
        port: 6379,
      }
    })

    worker.on('progress', (job: Job, progress: any) => {
      console.log("progress1", job.data);
      console.log("progress2", job.progress)
    })

    worker.on('completed', (job: Job, returnValue: any) => {
      console.log("completed1", job.data);
      console.log("completed2", returnValue)
    })

    worker.on('error', err => {
      console.error(err);
    })
  }
}



export { NotificationWorker }
