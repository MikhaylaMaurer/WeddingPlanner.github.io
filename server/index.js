// server/index.js
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/Auth');
const guestRoutes = require('./routes/Guest');
const checklistRoutes = require('./routes/Check');
const vendorRoutes = require('./routes/Vendor');
const dayOfRoutes = require('./routes/DayOf');
const budgetRoutes = require('./routes/Budget');
const calendarRoutes = require('./routes/Calendar');
const moodboardRoutes = require('./routes/Moodboard');
const playlistRoutes = require('./routes/Playlist');
const seatingRoutes = require('./routes/Seating');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

// Connect to the database
db.connect();

// Use authentication routes
app.use('/Auth', authRoutes);

// Use guest routes
app.use('/api', guestRoutes);

app.use('/api/checklist', checklistRoutes);

app.use('/api/vendors', vendorRoutes);

app.use('/api/dayof', dayOfRoutes);

app.use('/api/budget', budgetRoutes);

app.use('/api/calendar', calendarRoutes);

app.use('/api/moodboard', moodboardRoutes);

app.use('/api/playlist', playlistRoutes);
app.use('/api/seating', seatingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
