const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const TOKEN_VALIDITY = process.env.NUVO_V1_TOKEN_VALIDITY || '5h';
const TOKEN_MAX_VALIDITY = process.env.NUVO_V1_TOKEN_MAX_VALIDITY || '1d';
const JWT_SECRET = process.env.NUVO_JWT_SECRET || 'secret!25!Nuvo';

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_VALIDITY }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_MAX_VALIDITY }
  );
};

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password, role });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      access_token: generateAccessToken(user),
      refresh_token: generateRefreshToken(user),
      access_token_validity: TOKEN_VALIDITY,
      refresh_token_validity: TOKEN_MAX_VALIDITY,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        access_token: generateAccessToken(user),
        refresh_token: generateRefreshToken(user),
        access_token_validity: TOKEN_VALIDITY,
        refresh_token_validity: TOKEN_MAX_VALIDITY,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
