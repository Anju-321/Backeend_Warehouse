const mongoose=require('mongoose');

const warehouseSchema=new mongoose.Schema({
    warehousename:{type:String,required:true,unique:true},
    totalstock:{type: Number,integer: true},
    isActive:{type:Boolean,default:true}
})
const Warehouse=mongoose.model("Warehouse",warehouseSchema)

module.exports=Warehouse;