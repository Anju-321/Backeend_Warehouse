const express=require("express");
const router=express.Router();
const productController=require('../controllers/productController');

router.post('',productController.addproduct);
router.get('',productController.getProduct);
router.get('/:productid',productController.getSingleproduct);
router.put('/:productId',productController.updateproduct);
module.exports=router
