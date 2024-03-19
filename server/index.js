// server/index.js
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/Auth');
const guestRoutes = require('./routes/Guest'); // Import guest routes
const checklistRoutes = require('./routes/Check');
const vendorRoutes = require('./routes/Vendor');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
