const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    productid:{type:String},
    productname:{type:String,required:true}
})

const Product=mongoose.model("Product",productSchema)

module.exports=Product