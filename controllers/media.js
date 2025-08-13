const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Media = require('../models/Media'); // Make sure this path is correct

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const uploadsDir = 'assets/profile_pictures';
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const ext = path.extname(req.file.originalname);
    const filename = `${Date.now()}_${req.file.originalname.replace(/\s+/g, '_')}`;
    const outputPath = path.join(uploadsDir, filename);

    await sharp(req.file.path)
      .resize({ width: 400 })
      .toFile(outputPath);

    fs.unlinkSync(req.file.path);

    // Save media info to DB
    const mediaDoc = await Media.create({
      fileName: filename,
      filePath: outputPath.replace(/\\/g, '/'),
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      // Add more fields if needed
    });

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      filePath: mediaDoc.filePath,
      fileName: mediaDoc.fileName,
      mediaId: mediaDoc._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};