const express = require('express');
const deadStockController = require('../controllers/deadstockController');

const router = express.Router();

// Get all items in dead stock
router.get('', deadStockController.getAllDeadStockItems);

module.exports = router;
