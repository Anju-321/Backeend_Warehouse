// const Warehouse=require('../models/warehouseModel')
// const handleResponse=require('../utils/response')

// exports.addWarehouse=async(req,res)=>{
//     try{
//     const {warehouseid,warehousename,isActive}=req.body;
//     const warehouse=new Warehouse({
//         warehouseid,
//         warehousename,
//         isActive
//     })
//     const warehouseData=await warehouse.save()
//     handleResponse(res, {
//         message: "Product added successfully",
//         data: warehouseData,
//       });
//     } catch (error) {
//       handleResponse(res, {
//         message: "Cannot Add Product",
//         data: error.message,
//       });
//     }
// }

// exports.getallWarehouse = async (req, res) => {
//   try {
//     const products = await Warehouse.find();
//     handleResponse(res, {
//       message: "Warehouse retrieved successfully",
//       data: products,
//     });
//   } catch (error) {
//     handleResponse(res, {
//       message: "Cannot retrieve Warehouse",
//       data: error.message,
//     });
//   }
// };


// exports.getSingleWarehouse = async (req, res) => {
//   try {
//     const {warehouseId} = req.params;
//     console.log(req.params);

//     const product = await Warehouse.findOne({ warehouseId });

//     if (!product) {
//       return res.status(404).json({
//         message: 'Single Warehouse not found',
//       });
//     }

//     res.json({
//       message: 'Single Warehouse retrieved successfully',
//       data: product,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: 'Internal Server Error',
//       error: error.message,
//     });
//   }
// }

// exports.updateWarehouse = async (req, res) => {
//   try {
//     const { warehouseid } = req.params;
//     const { warehouseId, warehousename, isActive } = req.body;
//     console.log(warehousename, isActive,warehouseId);
//     const warehouse = await Warehouse.findById(warehouseid);

//     if (!warehouse) {
//       return handleResponse(res, {
//         message: "Warehouse not found",
//         data: null,
//       });
//     }

//     warehouse.warehousename = warehousename || warehouse.warehousename;
//     warehouse.isActive = isActive !== undefined ? isActive : warehouse.isActive;

//     const updatedWarehouse = await warehouse.save();

//     handleResponse(res, {
//       message: "Warehouse updated successfully",
//       data: updatedWarehouse,
//     });
//   } catch (error) {

//     handleResponse(res, {
//       message: "Cannot update warehouse",
//       data: error.message,
//     });
//   }
// };

const Warehouse = require("../models/warehouseModel");
const handleResponse = require("../utils/response");
const uuid=require("uuid")

exports.addWarehouse = async (req, res) => {
  try {
    const { warehousename, isActive } = req.body;
    const warehouseId = uuid.v4();
    const warehouse = new Warehouse({
      warehouseId,
      warehousename,
      isActive,
    });
    const warehouseData = await warehouse.save();
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
};

exports.getWarehouse = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    handleResponse(res, {
      message: "Warehouse retrieved successfully",
      data: warehouses,
    });
  } catch (error) {
    handleResponse(res, {
      message: "Cannot retrieve Warehouse",
      data: error.message,
    });
  }
};

exports.getSingleWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;
    console.log(req.params);

    // const product = await Warehouse.findOne({ warehouseId });
    const warehouse = await Warehouse.findById(warehouseId);

    if (!warehouse) {
      handleResponse(res, {
        message: "Single Warehouse not found",
      });
    }

    handleResponse(res, {
      message: "Single Warehouse retrieved successfully",
      data: warehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const { warehouseid } = req.params;
    const { warehouseId, warehousename, isActive } = req.body;
    console.log(warehousename, isActive, warehouseId);
    const warehouse = await Warehouse.findById(warehouseid);

    if (!warehouse) {
      return handleResponse(res, {
        message: "Warehouse not found",
        data: null,
      });
    }
    warehouse.warehousename = warehousename || warehouse.warehousename;
    warehouse.isActive = isActive !== undefined ? isActive : warehouse.isActive;

    const updatedWarehouse = await warehouse.save();

    handleResponse(res, {
      message: "Warehouse updated successfully",
      data: updatedWarehouse,
    });
  } catch (error) {
    handleResponse(res, {
      message: "Cannot update warehouse",
      data: error.message,
    });
  }
};

