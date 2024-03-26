// const mongoose = require('mongoose');

// const seatingSchema = new mongoose.Schema({
//     user: { type: String, required: true },
//     tables: [
//         {
//             taableNum: { type: Number, required: true },
//             guests: [{ type: String }]
//         }
//     ]
// });

// module.exports = mongoose.model('Seating', seatingSchema);
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableNum: {type: Number, required: true},
    guests: [{type: String}]

});

const seatingSchema = new mongoose.Schema({
    user: { type: String, required: true },
    table: [tableSchema]
});

module.exports = mongoose.model('Seating', seatingSchema);