const express = require("express");
const router = express.Router();
const Seating = require('../models/Seating.js');

// // Fetch seating data for all tables
// router.get('/:user/:tableNum', async (req, res) => {
//     try {
//         //const { user } = req.params;
//         const { user, tableNum } = req.params;
//         //const tableNum = parseInt(req.params.tableNum, 10);

//         console.log("Querying for:", { user, tableNum }); // Log the parameters

//         const seatingData = await Seating.findOne({ user, tableNum });
        
//         console.log("Found seating data:", seatingData); // Log the result

//         if (!seatingData) {
//             return res.status(404).send('Seating data not found.');
//         }

//         res.json(seatingData);
//     } 
//     catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while fetching seating data');
//     }
// });
// // router.get('/:user/:tableNum', async (req, res) => {
// //     try {
// //         const { user } = req.params;
// //         // Convert tableNum to integer
// //         const tableNum = parseInt(req.params.tableNum, 10);
        
// //         console.log("Querying for:", { user, tableNum }); // Log the parameters
        
// //         const seatingData = await Seating.findOne({ user, tableNum });
        
// //         console.log("Found seating data:", seatingData); // Log the result
        
// //         if (!seatingData) {
// //             return res.status(404).send('Seating data not found.');
// //         }
        
// //         res.json(seatingData);
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send('An error occurred while fetching seating data');
// //     }
// // });


// // router.post('/add', async (req, res) => {
// //     const { username, tables } = req.body;
  
// //     try {
// //       // Update the seating arrangement for the user, or create a new one if it doesn't exist
// //       await Seating.findOneAndUpdate(
// //         { user: username },
// //         { user: username, tables: tables },
// //         { upsert: true, new: true }
// //       );
// //       res.status(200).json({ message: 'Seating arrangement saved successfully.' });
// //     } catch (error) {
// //       console.error('Failed to save seating arrangement:', error);
// //       res.status(500).json({ message: 'Failed to save seating arrangement.' });
// //     }
// //   });

// router.post('/add', async (req, res) => {
//     const { user, tableNum, guest } = req.body;
//     console.log(user, " ", tableNum, " ", guest);
  
//     try {
//       // Find the specific seating document
//       const seating = await Seating.findOne({ user, tableNum });
      
//       if (!seating) {
//         // If no seating found, create a new one
//         const newSeating = new Seating({
//           user,
//           tableNum,
//           guests: [guest] // Start with the single guest
//         });
//         await newSeating.save();
//       } else {
//         // If found, add the new guest to the guests array
//         seating.guests.push(guest);
//         await seating.save();
//       }

//       res.status(200).json({ message: 'Guest added successfully.' });
//     } catch (error) {
//       console.error('Failed to add guest:', error);
//       res.status(500).json({ message: 'Failed to add guest.' });
//     }
// });


// // Update guest name for a specific seat
// router.put('/:tableNum/:seatIndex', async (req, res) => {
//     try {
//         const { tableNum, seatIndex } = req.params;
//         const { guestName } = req.body;
//         const seating = await Seating.findOneAndUpdate(
//             { tableNum },
//             { $set: { [`guests.${seatIndex}`]: guestName } },
//             { new: true }
//         );
//         res.json(seating);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while updating guest name');
//     }
// });

// module.exports = router;

// Fetch seating information for a specific user
router.get('/:user', async (req, res) => {
    try {
        const user = req.params.user;
        const seatingInfo = await Seating.findOne({ user });
        res.json(seatingInfo);
    } catch (err) {
        console.error('Error fetching seating information:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update or create seating information
router.post('/add', async (req, res) => {
    try {
      const { user, tableNum, guests } = req.body;
      let seating = await Seating.findOne({ user });
      if (!seating) {
        seating = new Seating({ user, table: [{ tableNum, guests }] });
      } else {
        // Check if the table exists in seating
        const tableIndex = seating.table.findIndex(table => table.tableNum === tableNum);
        if (tableIndex === -1) {
          // Table doesn't exist, add it
          seating.table.push({ tableNum, guests });
        } else {
          // Table exists, update guests
          seating.table[tableIndex].guests = guests;
        }
      }
      await seating.save();
      res.status(200).send("Seating information updated successfully");
    } catch (error) {
      console.error("Error adding or updating seating information:", error);
      res.status(500).send("Failed to add or update seating information");
    }
  });
  
module.exports = router;