import { Worker } from "bullmq";
import connection from "./redis.js";
import axios from "axios";


console.log("Worker + Scheduler started...");


const worker = new Worker(
 "reminders",
 async job => {
      try {
   const { recordId, webhook, hoursBefore, status } = job.data;

   await axios.post(webhook, {
     record_id: recordId,
     reminder: hoursBefore,
     Status : status
   });

   console.log(`Reminder sent ${recordId} (${hoursBefore}h)`);
   
  } catch (error) {
      console.error(`Failed job ${job.id}:`, error.message);
      throw error; // VERY IMPORTANT → enables retry
  }
 },
 { connection }
);



worker.on("completed", job => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job.id}`, err.message);
});