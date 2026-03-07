import express, { json } from "express";
import scheduleReminders from "./scheduler.js";

const app = express();
app.use(json());

app.post("/create-booking", async (req, res) => {

 const {
   recordId,
   bookingTime,
   webhook,
   reminders
 } = req.body;

 await scheduleReminders(
   recordId,
   bookingTime,
   webhook,
   reminders
 );

 res.send("Reminders scheduled");

});

app.listen(3000, () => {
 console.log("Server running");
});