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
    res.json(playlistContent);
  }
  catch(error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the playlist');
  }
});

router.post('/addSong', async (req, res) => {
  try {
    const { user, song, artist } = req.body;

    // Find the playlist document for the given user and push a new song into the songs array
    const result = await Playlist.findOneAndUpdate(
      { user: user }, 
      {
        $push: {
          songs: {
            song: song,
            artist: artist
          }
        }
      }, 
      { upsert: true, new: true }
    );

    if (result) {
      res.json({ message: 'Song added successfully.', result: result });
    } else {
      res.status(404).json({ message: 'Failed to add the song.' });
    }
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ message: 'Error adding song to playlist.', error: error });
  }
});

router.post('/addSpotify', async (req, res) => {
  const { user, url, name } = req.body;

  try {
    const result = await Playlist.findOneAndUpdate(
      { user },
      { $push: { spotifyLinks: { url, name } } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Spotify playlist added successfully", result });
  } catch (error) {
    console.error("Failed to add Spotify playlist:", error);
    res.status(500).json({ message: "Error adding Spotify playlist", error });
  }
});

// Add new spotify playlist
// router.post('/addSpotify', async (req, res) => 
// {
//   try {
//     const { user, url, name } = req.body;
//     const newSpotifyPlaylist = new Spotify({ user, url, name });
//     await newSpotifyPlaylist.save();
//     res.status(201).send('Spotify playlist added successfully');
//   }
//   catch(error) {
//     console.error(error);
//     res.status(500).send('An error occurred while adding the spotify playlist');
//   }
// });

// // Delete song from playlist
// router.delete('/deleteSong/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Playlist.findOneAndDelete({ _id: id });
//     res.status(200).send('Song removed successfully');
//   } 
//   catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while deleting the song to the playlist');
//   }
// });

router.delete('/deleteSong/:user/:songId', async (req, res) => {
  try {
    const { user, songId } = req.params;

    const result = await Playlist.findOneAndUpdate(
      { user: user }, 
      {
        $pull: {
          songs: {
            _id: songId // Assuming songId is the _id of the song to be deleted
          }
        }
      },
      { new: true }
    );

    if (result) {
      res.json({ message: 'Song deleted successfully.', result: result });
    } else {
      // Handle the case where the playlist is not found or not updated for some reason
      res.status(404).json({ message: 'Failed to delete the song.' });
    }
  } catch (error) {
    console.error('Error deleting song from playlist:', error);
    res.status(500).json({ message: 'Error deleting song from playlist.', error: error });
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