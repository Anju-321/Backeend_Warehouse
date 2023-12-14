const express=require("express");
const router=express.Router();
const stockController=require('../controllers/stockController')

router.post('',stockController.addStock)
router.get('',stockController.getAllStock)
router.get('/warehouses',stockController.gettotalstockByWarehouse)
router.get('/:warehouseId',stockController.getStockByWarehouse)
router.get('/:warehouseId/:productId',stockController.getStockOfProductByWarehouse)
module.exports=router