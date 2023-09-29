const express = require("express");
const router = express.Router();

const imagesUpload = require("../middlewares/uploadMiddleware")

const profile = require("../controllers/profile-controller");

const jwtAuthMiddleware = require("../middlewares/jwtAuth")

// Profile Route
router.get('/dashboard', jwtAuthMiddleware, profile.dashboard);

// Update profile
router.put('/update', jwtAuthMiddleware,imagesUpload, profile.updateProfile)

module.exports = router;