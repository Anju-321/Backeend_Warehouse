const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

// Create a new movement
router.post('/movements', movementController.createMovement);

// Add more routes as needed

module.exports = router;
