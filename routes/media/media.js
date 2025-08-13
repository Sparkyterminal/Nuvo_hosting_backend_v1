// In your userRoutes.js or a new route file
const express = require('express');
const router = express.Router();

const isAuth = require('../../authentication/is-auth');
const multer = require('multer');
const { uploadProfilePicture } = require('../../controllers/media');
const upload = multer({ dest: 'assets/temp_resources' });

router.post('/', upload.single('media'), uploadProfilePicture);
module.exports = router;
