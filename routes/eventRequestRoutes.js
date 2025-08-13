const express = require('express');
const router = express.Router();
const {
  createEventRequest,
  getAllEventRequests,
  getEventRequestById,
  updateEventRequest,
  deleteEventRequest
} = require('../controllers/eventRequestController');

router.post('/', createEventRequest);              // Create
router.get('/', getAllEventRequests);              // Read all
router.get('/:id', getEventRequestById);           // Read one
router.put('/:id', updateEventRequest);            // Update
router.delete('/:id', deleteEventRequest);         // Delete

module.exports = router;
