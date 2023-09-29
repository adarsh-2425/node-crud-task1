const express = require('express');
const router = express.Router();

const imagesUpload = require('../middlewares/uploadMiddleware');

const auth = require("../controllers/auth-controller.js")

// SignUp Route
router.post('/signup',imagesUpload,  auth.signUp);

// Login Route
router.post('/login', auth.login);


module.exports = router;