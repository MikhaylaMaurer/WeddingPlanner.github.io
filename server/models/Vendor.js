// models/Vendor.js

const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: { type: String, required: true },
  vendors: [
    {
      title: String,
      name: String,
      phoneNumber: String,
      email: String
    }
  ]
});

module.exports = mongoose.model('Vendor', vendorSchema);
