var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

app.use(express.json());

var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

var Budget = require('./WeddingPlanner');

app.post('/budget', async (req, res) => {
  var newBudgetItem = new Budget({
    category: req.body.category,
    name: req.body.name,
    budgeted: req.body.budgeted,
    actual: req.body.actual,
  });

  try {
    const result = await newBudgetItem.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/budget', async (req, res) => {
  try {
    const budgetItems = await Budget.find();
    res.status(200).json(budgetItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/budget/:id', async (req, res) => {
  try {
    const updatedItem = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/budget/:id', async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Budget item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
