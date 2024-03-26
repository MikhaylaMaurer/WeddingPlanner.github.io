var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const spotifySchema = new mongoose.Schema( {
    user: { type: String, required: true },
    url: { type:String, required: true },
    name: { type: String, required: true }
    } );

module.exports = mongoose.model('Spotify', spotifySchema);