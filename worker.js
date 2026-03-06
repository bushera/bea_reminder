import { Worker } from "bullmq";
import connection from "./redis";
import { post } from "axios";

new Worker(
 "reminders",
 async job => {

   const { recordId, webhook, hoursBefore } = job.data;

   await post(webhook, {
     record_id: recordId,
     reminder: hoursBefore
   });

   console.log("Reminder sent");

 },
 { connection }
);