const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');

// Create a new movement
router.post('', movementController.createMovement);
//get movement
router.get('', movementController.getMovements);

// Add more routes as needed

module.exports = router;
