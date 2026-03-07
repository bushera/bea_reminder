import { Worker } from "bullmq";
import connection from "./redis.js";
import axios from "axios";

console.log("Worker started...");

new Worker(
 "reminders",
 async job => {

   const { recordId, webhook, hoursBefore } = job.data;

   await axios.post(webhook, {
     record_id: recordId,
     reminder: hoursBefore
   });

   console.log(`Reminder sent ${recordId} (${hoursBefore}h)`);

 },
 { connection }
);