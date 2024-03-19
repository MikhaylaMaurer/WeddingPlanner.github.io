// models/Event.js

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: { type: String, required: true },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model("Event", eventSchema);
