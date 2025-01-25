require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');
const downloadRoutes = require('./routes/downloadRoutes'); // Import the download route
const uploadRoutes = require('./routes/uploadRoutes');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);  // Create the directory if it doesn't exist
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    });
});

// Use the routes
app.use('/api', router);
app.use('/download', downloadRoutes);  // Added the download route
app.use('/api', uploadRoutes);

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server running at " + PORT);
    });
});