const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vendorName: { type: String, required: true },
    phoneNumber: String,
    email: String,
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
