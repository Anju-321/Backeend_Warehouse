const DeadStock = require('../models/deadstockModel');
const handleResponse = require("../utils/response");

// Get all items in dead stock
exports.getAllDeadStockItems = async (req, res) => {
  try {
    const deadStockItems = await DeadStock.find()
      .populate({
        path: 'product.product',
        model: 'Product',
      })
      .populate('warehouse');

    // res.status(200).json(deadStockItems);
    handleResponse(res, {
      message: "Got dead stocks successfully",
      data: deadStockItems,
    });
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ error: 'Internal Server Error' });
    handleResponse(res, {
      message: "Cannot get deadstock",
      data: error.message,
    });
  }
};

