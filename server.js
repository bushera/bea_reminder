const express = require("express");
const scheduleReminders = require("./scheduler");

const app = express();
app.use(express.json());

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