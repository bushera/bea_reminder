import { add } from "./queue";

async function scheduleReminders(recordId, bookingTime, webhook, reminders) {

 const booking = new Date(bookingTime);
 const now = new Date();

 for (const hours of reminders) {

   const reminderTime = new Date(
     booking.getTime() - hours * 60 * 60 * 1000
   );

   const delay = reminderTime - now;

   if (delay > 0) {

     await add(
       "reminder",
       {
         recordId,
         webhook,
         hoursBefore: hours
       },
       {
         delay: delay,
         jobId: `${recordId}-${hours}h`,
         attempts: 5,
          backoff: {
            type: "exponential",
            delay: 60000
          }
       }
     );

   }
 }

}

export default scheduleReminders;