const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  username: { type: String, required: true },
  items: {type: Object}
});

module.exports = mongoose.model('Checklist', checklistSchema);
