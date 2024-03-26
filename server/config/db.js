// server/config/db.js
const mongoose = require('mongoose');

function connect() {
  mongoose.connect('mongodb+srv://w3bapp5:w3bapp5@cluster0.17joj3z.mongodb.net/WeddingPlanner?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
}

module.exports = { connect };
