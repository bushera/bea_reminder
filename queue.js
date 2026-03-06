import { Queue } from "bullmq";
import connection from "./redis";

const reminderQueue = new Queue("reminders", {
 connection
});

export default reminderQueue;