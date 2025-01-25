// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));  // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  // Unique filename
        cb(null, uniqueSuffix + path.extname(file.originalname));  // Save with original file extension
    }
});

const upload = multer({ storage: storage });

// File upload route
router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ fileUrl: `/uploads/${req.file.filename}` });  // Respond with the file's URL
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

module.exports = router;