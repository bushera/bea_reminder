const { Queue } = require("bullmq");
const connection = require("./redis");

const reminderQueue = new Queue("reminders", {
 connection
});

module.exports = reminderQueue;