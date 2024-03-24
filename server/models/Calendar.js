// models/CalendarEvent.js
const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: String, required: true },
  eventName: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model('CalendarEvent', calendarEventSchema);