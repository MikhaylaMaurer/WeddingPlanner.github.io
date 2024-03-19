const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Reference to the user who added the guest
    firstName: { type: String, required: true },
    phoneNumber: String,
    address: String,
    mealPreference: String,
    rsvpStatus: String,
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
