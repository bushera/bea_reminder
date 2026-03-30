import reminderQueue from "./queue.js";

async function scheduleReminders(
  recordId,
  bookingTime,
  webhook,
  reminders,
  status
) {

  const booking = new Date(bookingTime);

  for (const hours of reminders) {

    const jobId = `${recordId}-${hours}h`;

    // Check if job already exists
    const existingJob = await reminderQueue.getJob(jobId);

    // CANCEL → remove existing job
    if (status === "cancel") {

      if (existingJob) {
        await existingJob.remove();
        console.log(`Reminder removed: ${jobId}`);
      }

      continue;
    }

    // RESCHEDULE → remove old job first
    if (status === "reschedule") {

      if (existingJob) {
        await existingJob.remove();
        console.log(`Old reminder removed: ${jobId}`);
      }

    }

    // ACTIVE → skip if already exists
    if (status === "active" && existingJob) {
      console.log(`Reminder already exists: ${jobId}`);
      continue;
    }

    const reminderTime = new Date(
      booking.getTime() - hours * 60 * 60 * 1000
    );

    const delay = reminderTime - new Date();

    if (delay > 0) {

      await reminderQueue.add(
        "reminder",
        {
          recordId,
          webhook,
          hoursBefore: hours,
          status
        },
        {
          delay,
          jobId,
          attempts: 5,
          backoff: {
            type: "exponential",
            delay: 60000
          }
        }
      );

      console.log(`Reminder scheduled: ${jobId}`);

    }

    if (delay <= 0) {
  console.log(`Skipped past reminder: ${jobId}`);
  continue;
    }

  }

}

export default scheduleReminders;