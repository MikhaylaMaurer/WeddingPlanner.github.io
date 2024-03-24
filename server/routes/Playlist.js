const express = require("express");
const router = express.Router();

const Playlist = require('../models/Playlist.js');
//const Spotify = require('../models/Spotify.js')

// Load playlist and spotify content from database
router.get('/:user', async (req, res) => {
  try {
    const { user } = req.params;
    const playlistContent = await Playlist.findOne({ user });

    console.log(playlistContent);
    return res.json(playlistContent);
  }
  catch(error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the playlist');
  }
});

// Add song to playlist
router.post('/addSong', async (req, res) => 
{
  try {
    const { user, spotifyLinks, songs } = req.body;
    ////// HOW TO ADD BOTH OBJECTS, WHAT DO WITH SPOTIFY??????
    const result = await Playlist.findOneAndUpdate({ user }, { user, spotifyLinks: ?? songs: ?? }, { upsert: true, new: true }); 
    // const newSong = new Playlist({ user, song, artist });
    // await newSong.save();

    const budget = await Budget.findOneAndUpdate(
        { user },
        { user, budgetCategories: updatedCategories, totalBudgeted, totalActual },
        { new: true, upsert: true }
      );

      const playlistSchema = new mongoose.Schema ( {
        user: { type: String, required: true },
        spotifyLinks: [spotifySchema],
        songs: [songListSchema]
    });

    res.status(201).send('Song added successfully');
  }
  catch(error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the song to the playlist');
  }
});

// Add new spotify playlist
router.post('/addSpotify', async (req, res) => 
{
  try {
    const { user, url, name } = req.body;
    const newSpotifyPlaylist = new Spotify({ user, url, name });
    await newSpotifyPlaylist.save();
    res.status(201).send('Spotify playlist added successfully');
  }
  catch(error) {
    console.error(error);
    res.status(500).send('An error occurred while adding the spotify playlist');
  }
});

// Delete song from playlist
router.delete('/deleteSong/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Playlist.findOneAndDelete({ _id: id });
    res.status(200).send('Song removed successfully');
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the song to the playlist');
  }
});

// Delete spotify playlist from library
router.delete('/deleteSpotify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Spotify.findOneAndDelete({ _id: id });
    res.status(200).send('Spotify playlist removed successfully');
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the spotify playlist');
  }
});

module.exports = router;