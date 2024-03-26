// routes/CalendarEvents.js
const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/Calendar');

// Route to add a calendar event
router.post('/addEvent', async (req, res) => {
  const { user, date, eventName, color } = req.body;
  const newEvent = new CalendarEvent({ user, date, eventName, color });
  try {
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding calendar event:', error);
    res.status(500).json({ message: 'Failed to add event' });
  }
});

// Route to fetch calendar events for a user
router.get('/events/:user', async (req, res) => {
  const { user } = req.params;
  try {
    const events = await CalendarEvent.find({ user });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to delete a calendar event
router.delete('/deleteEvent/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await CalendarEvent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

module.exports = router;