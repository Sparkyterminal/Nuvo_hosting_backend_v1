const StaffRequest = require('../models/staffRequestModel');

// Create new staff request
const createStaffRequest = async (req, res) => {
  try {
    const data = req.body;

    // Handle uploaded file if using multer
    if (req.file) {
      data.images = {
        profilePhoto: req.file.filename
      };
    }

    // Convert flat language fields to array (if submitted that way)
    if (data.language1 || data.rate1) {
      data.languages = [
        { name: data.language1, proficiency: data.rate1 },
        { name: data.language2, proficiency: data.rate2 },
        { name: data.language3, proficiency: data.rate3 },
        { name: data.language4, proficiency: data.rate4 }
      ].filter(lang => lang.name);
    }

    // Normalize experienceAreas to array if not already
    if (data.experienceAreas && !Array.isArray(data.experienceAreas)) {
      data.experienceAreas = [data.experienceAreas];
    }

    const newRequest = await StaffRequest.create(data);
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: 'Error creating staff request', error: err.message });
  }
};

// Get all staff requests
const getAllStaffRequests = async (req, res) => {
  try {
    const requests = await StaffRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
};

// Get staff request by ID
const getStaffRequestById = async (req, res) => {
  try {
    const request = await StaffRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Not found' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID', error: err.message });
  }
};

// Update staff request
const updateStaffRequest = async (req, res) => {
  try {
    const updated = await StaffRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// Delete staff request
const deleteStaffRequest = async (req, res) => {
  try {
    const deleted = await StaffRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Deletion failed', error: err.message });
  }
};

module.exports = {
  createStaffRequest,
  getAllStaffRequests,
  getStaffRequestById,
  updateStaffRequest,
  deleteStaffRequest
};
