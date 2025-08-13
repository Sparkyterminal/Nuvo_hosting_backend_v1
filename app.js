const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRequestRoutes = require('./routes/eventRequestRoutes');
const authRoutes = require('./routes/authRoutes');
const staffRequestRoutes = require('./routes/staffRequestRoutes');
const mediaRoutes = require('./routes/media');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/event-requests', eventRequestRoutes);
app.use('/api/staff-requests', staffRequestRoutes);
app.use('/api/media', mediaRoutes);


module.exports = app;
