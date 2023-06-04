import { Job, Worker } from "bullmq";


class NotificationWorker {
  constructor() {
    const worker: Worker = new Worker('notification', async (job: Job) => {
      await job.updateProgress(job.data)
      return job.data;
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
