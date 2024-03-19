const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');

// Route to fetch checklist for a user
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const checklist = await Checklist.findOne({ username });
    console.log('Retrieved checklist:', checklist);
    res.json(checklist);
  } catch (error) {
    console.error('Error fetching checklist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update checklist for a user
router.put('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const items = req.body.items;
    let checklist = await Checklist.findOne({ username });
    if (!checklist) {
      checklist = new Checklist({ username, items });
    } else {
      checklist.items = items;
    }
    await checklist.save();
    res.json({ message: 'Checklist updated successfully' });
  } catch (error) {
    console.error('Error updating checklist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
