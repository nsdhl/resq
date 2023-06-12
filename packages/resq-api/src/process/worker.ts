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
      const users = await getNearestUsers(job.data.location);

      const subscribedUsers = await Subscription.find({ user: users.map(el => el._id) }).select(["-user", "-_id", "-__v"])
      console.log("hello", subscribedUsers);

      const options: any = {
        vapidDetails: {
          subject: 'mailto:resq@resq.com',
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
      }

      subscribedUsers.map(async (el: any) => {
        try {
          await webPush.sendNotification(
            el,
            JSON.stringify({
              title: job.data.incidentName,
              description: job.data.description,
              location: job.data.location
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
    })

    worker.on('completed', (job: Job, returnValue: any) => {
    })

    worker.on('error', err => {
      console.error(err);
    })
  }
}



export { NotificationWorker }
