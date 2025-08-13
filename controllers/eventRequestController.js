const EventRequest = require('../models/eventRequestModel');

// Create new event request
const createEventRequest = async (req, res) => {
  try {
    const data = req.body;
    const newRequest = await EventRequest.create(data);
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: 'Error creating event request', error: err.message });
  }
};

// Get all event requests
const getAllEventRequests = async (req, res) => {
  const events = await EventRequest.find();
  res.json(events);
};

// Get single request by ID
const getEventRequestById = async (req, res) => {
  const event = await EventRequest.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  res.json(event);
};

// Update request
const updateEventRequest = async (req, res) => {
  try {
    const updated = await EventRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// Delete request
const deleteEventRequest = async (req, res) => {
  const deleted = await EventRequest.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
};

module.exports = {
  createEventRequest,
  getAllEventRequests,
  getEventRequestById,
  updateEventRequest,
  deleteEventRequest
};
