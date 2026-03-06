const { Worker } = require("bullmq");
const connection = require("./redis");
const axios = require("axios");

new Worker(
 "reminders",
 async job => {

   const { recordId, webhook, hoursBefore } = job.data;

   await axios.post(webhook, {
     record_id: recordId,
     reminder: hoursBefore
   });

   console.log("Reminder sent");

 },
 { connection }
);