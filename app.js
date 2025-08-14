const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRequestRoutes = require('./routes/eventRequestRoutes');
const authRoutes = require('./routes/authRoutes');
const staffRequestRoutes = require('./routes/staffRequestRoutes');
const mediaRoutes = require('./routes/media');
const app = express();
// Schedule cron job to empty certain directories daily at 01:01 AM
cron.schedule('01 01 * * *', () => {
    const empty_these_directories = [
        "assets/district_issues",
        "assets/department_issues",
        "assets/district_reports",
        "assets/dis_reports",
    ];

    empty_these_directories.forEach((directory) => {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) throw err;
                });
            }
        });
    });
});

// Enable CORS
app.use(cors());

// Security headers with Helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Logger middleware
app.use(morgan("dev"));

// Set payload limit to 2GB
const payloadLimit = 2 * 1024 * 1024 * 1024; // 2GB in bytes
app.use(express.json({ limit: payloadLimit }));
app.use(express.urlencoded({ limit: payloadLimit, extended: true }));

// Serve static assets folder
const API_ROOT = '/';
app.use(`${API_ROOT}assets`, express.static(path.join(__dirname, "assets")));

// Disable etag for fresh content on each request
app.disable('etag');

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/event-requests', eventRequestRoutes);
app.use('/api/staff-requests', staffRequestRoutes);
app.use('/api/media', mediaRoutes);


module.exports = app;
