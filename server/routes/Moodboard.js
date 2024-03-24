const express = require("express");
const router = express.Router();

const Moodboard = require('../models/Moodboard.js');

// Load moodboard page by fetching moodboard database content 
router.get('/:user', async (req, res) => {
    try {
        const { user } = req.params;
        const photos = await Moodboard.findOne({ user });
        console.log(photos);
        console.log(user);
        return res.json(photos);
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the moodboard');
    }
} );

// Add a new photo to the moodboard based on active guest username
router.post('/add', async (req, res) => {
    try {
        const { user, urlLink } = req.body;
        console.log(user);
        console.log(urlLink);
        const result = await Moodboard.findOneAndUpdate({ user }, { urlLink }, { upsert: true, new: true });
        console.log(result);
        res.status(200).send('Photo added to moodboard successfully');
    }
    catch(error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the photo to the moodboard');
    }
});

// Delete photo from the moodboard
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Moodboard.findOneAndDelete({_id: id});
        res.status(200).send('Photo removed from the moodboard successfully');
    }
    catch(error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the photo from the moodboard');
    }
});

// router.delete("/removeGuest/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       await Guest.findOneAndDelete({ _id: id });
//       res.status(200).json({ message: "Guest removed successfully" });
//     } catch (error) {
//       console.error("Error removing guest:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

module.exports = router;