const Warehouse=require('../models/warehouseModel')
const handleResponse=require('../utils/response')

exports.addWarehouse=async(req,res)=>{
    try{
    const {warehousename,totalstock,isActive}=req.body;
    const warehouse=new Warehouse({
        warehousename,
        totalstock,
        isActive
    })
    const warehouseData=await warehouse.save()
    handleResponse(res, {
        message: "Product added successfully",
        data: warehouseData,
      });
    } catch (error) {
      handleResponse(res, {
        message: "Cannot Add Product",
        data: error.message,
      });
    }
}