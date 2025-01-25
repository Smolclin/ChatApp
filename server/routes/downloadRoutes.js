const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Route to download files from the 'uploads' directory
router.get('/:filename', (req, res) => {
  const { filename } = req.params;  // Get the filename from the URL parameter
  const filePath = path.join(__dirname, '..', 'uploads', filename);  // Construct the file path

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send('Error downloading the file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

module.exports = router;