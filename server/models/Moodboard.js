const mongoose = require('mongoose');

const moodboardSchema = new mongoose.Schema( {
    user: { type: String, required: true },
    urlLink: [{type: String, required: true}]
    } );

module.exports = mongoose.model('Moodboard', moodboardSchema);