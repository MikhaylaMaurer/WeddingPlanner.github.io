// routes/Guest.js

const express = require("express");
const router = express.Router();
const Guest = require("../models/GuestList"); // Import the Guest model

// Route for adding a guest
router.post("/addGuest", async (req, res) => {
  try {
    const {
      user,
      firstName,
      phoneNumber,
      address,
      mealPreference,
      rsvpStatus,
    } = req.body;
    console.log("user: ", user);
    const newGuest = new Guest({
      user,
      firstName,
      phoneNumber,
      address,
      mealPreference,
      rsvpStatus,
    });
    await newGuest.save();
    res.status(201).json({ message: "Guest added successfully" });
  } catch (error) {
    console.error("Error adding guest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for removing a guest
router.delete("/removeGuest/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Guest.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Guest removed successfully" });
  } catch (error) {
    console.error("Error removing guest:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for fetching all guests
router.get("/guests", async (req, res) => {
  try {
    const username = req.query.username;
    const guests = await Guest.find({ user: username });
    res.status(200).json(guests);
  } catch (error) {
    console.error("Error fetching guests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateGuest/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { rsvpStatus } = req.body;
      await Guest.findByIdAndUpdate(id, { rsvpStatus });
      res.status(200).json({ message: "Guest RSVP status updated successfully" });
    } catch (error) {
      console.error("Error updating guest RSVP status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
