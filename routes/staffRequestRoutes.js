const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Multer config
const controller = require('../controllers/staffRequestController');

// Create (with image upload)
router.post('/', upload.single('profilePhoto'), controller.createStaffRequest);

// Read
router.get('/', controller.getAllStaffRequests);
router.get('/:id', controller.getStaffRequestById);

// Update
router.put('/:id', controller.updateStaffRequest);

// Delete
router.delete('/:id', controller.deleteStaffRequest);

module.exports = router;
