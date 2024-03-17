const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  budgeted: Number,
  actual: Number,
});

const Budget = mongoose.model('budget', budgetSchema);

module.exports = {
  Budget,
  // Add other models here as you create them
};
