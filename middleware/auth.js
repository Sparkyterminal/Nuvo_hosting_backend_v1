const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventRequestsController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getAllEventRequests);

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.NUVO_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { auth, router };