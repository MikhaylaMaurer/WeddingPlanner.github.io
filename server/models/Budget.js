const mongoose = require('mongoose');

const budgetItemSchema = new mongoose.Schema({
  name: String,
  budgeted: Number,
  actual: Number,
});

const budgetCategorySchema = new mongoose.Schema({
  title: String,
  items: [budgetItemSchema],
});

const budgetSchema = new mongoose.Schema({
  user: String,
  budgetCategories: [budgetCategorySchema],
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;