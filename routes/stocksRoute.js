// const express=require("express");
// const router=express.Router();
// const stockController=require('../controllers/stockController')

// router.get('/getstock',stockController.getAllStocks)
// router.post('/addstock',stockController.createStock)
// module.exports=router
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Get all stock entries
router.get('/stock', stockController.getAllStock);
// Add stock
router.post('/stock', stockController.addStock);

// Get stock of a particular warehouse
router.get('/stock/warehouse/:warehouseId', stockController.getStockByWarehouse);

// Get stock of a particular product
router.get('/stock/product/:productId', stockController.getStockByProduct);

// Add more stock-related routes as needed

module.exports = router;
