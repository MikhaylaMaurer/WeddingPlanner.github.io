var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const spotifySchema = new mongoose.Schema( {
    url: { type:String, required: true },
    name: { type: String, required: true }
    } );

const songListSchema = new mongoose.Schema( {
    song: {type: String, required: true},
    artist: {type: String, required: true}
    } );

const playlistSchema = new mongoose.Schema ( {
    user: { type: String, required: true },
    spotifyLinks: [spotifySchema],
    songs: [songListSchema]
});

module.exports = mongoose.model('Playlist', playlistSchema);