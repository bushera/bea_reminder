const reminderQueue = require("./queue");

async function scheduleReminders(recordId, bookingTime, webhook, reminders) {

 const booking = new Date(bookingTime);
 const now = new Date();

 for (const hours of reminders) {

   const reminderTime = new Date(
     booking.getTime() - hours * 60 * 60 * 1000
   );

   const delay = reminderTime - now;

   if (delay > 0) {

     await reminderQueue.add(
       "reminder",
       {
         recordId,
         webhook,
         hoursBefore: hours
       },
       {
         delay: delay,
         jobId: `${recordId}-${hours}h`
       }
     );

   }
 }

}

module.exports = scheduleReminders;