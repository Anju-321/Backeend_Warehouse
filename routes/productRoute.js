const express=require("express");
const router=express.Router();
const productController=require('../controllers/productController')

router.post('/addproduct',productController.addproduct)
router.get('/getproduct',productController.getProduct)
router.get('/getproduct/:productId',productController.getSingleproduct)
router.put('/updateproduct/:productId',productController.updateproduct);
module.exports=router