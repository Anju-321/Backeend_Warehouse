const express = require('express');
const router = express.Router();
const warehouseController=require('../controllers/warehouseController')

router.post('',warehouseController.addWarehouse);
router.get('',warehouseController.getWarehouse);
router.get('/:warehouseId',warehouseController.getSingleWarehouse);
router.put('/:warehouseid',warehouseController.updateWarehouse);
module.exports=router