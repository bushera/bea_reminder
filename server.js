import express, { json } from "express";
import scheduleReminders from "./scheduler.js";

const app = express();
app.use(json());

app.post("/create-booking", async (req, res) => {

 const {
   recordId,
   bookingTime,
   webhook,
   reminders,
   status
 } = req.body;

 await scheduleReminders(
   recordId,
   bookingTime,
   webhook,
   reminders, 
   status
 );

});


 app.get("/", (req,res)=>{
 res.send("Reminders scheduled")
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
});