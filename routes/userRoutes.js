const express = require('express');
const router = express.Router();
const { getUsers, createUser, changePassword } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);
router.post('/change-password',changePassword);


module.exports = router;
