// routes/DayOf.js

const express = require("express");
const router = express.Router();
const Event = require("../models/DayOf");

// Route for adding an event
router.post("/addEvent", async (req, res) => {
  try {
    const { user, time, description } = req.body;
    const newEvent = new Event({ user, time, description });
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
});

// Route for removing an event
router.delete("/removeEvent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event removed successfully" });
  } catch (error) {
    console.error("Error removing event:", error);
    res.status(500).json({ message: "Failed to remove event" });
  }
});

router.get("/events", async (req, res) => {
    try {
      const username = req.query.username;
      const events = await Event.find({ user: username });
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching day-of events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
