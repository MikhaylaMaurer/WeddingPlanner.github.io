const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Get budget data for a user
router.get('/:user', async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.params.user });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching budget data', error });
  }
});

// Save or update budget data for a user
router.post('/', async (req, res) => {
  try {
    const { user, budgetCategories } = req.body;

    const updatedCategories = budgetCategories.map((category) => {
      const updatedItems = category.items.map((item) => ({
        ...item,
        budgeted: parseFloat(item.budgeted) || 0,
        actual: parseFloat(item.actual) || 0,
      }));
      const totalBudgeted = updatedItems.reduce((sum, item) => sum + item.budgeted, 0);
      const totalActual = updatedItems.reduce((sum, item) => sum + item.actual, 0);
      return { ...category, items: updatedItems, totalBudgeted, totalActual };
    });

    const totalBudgeted = updatedCategories.reduce((sum, category) => sum + category.totalBudgeted, 0);
    const totalActual = updatedCategories.reduce((sum, category) => sum + category.totalActual, 0);

    const budget = await Budget.findOneAndUpdate(
      { user },
      { user, budgetCategories: updatedCategories, totalBudgeted, totalActual },
      { new: true, upsert: true }
    );
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Error saving budget data', error });
  }
});


module.exports = router;