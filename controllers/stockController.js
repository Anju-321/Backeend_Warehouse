// const Stock = require("../models/stockModel");
// const handleResponse = require("../utils/response");
// const Product = require("../models/productModel");
// const Warehouse = require("../models/warehouseModel");



//  exports.createStock= async (req, res) => {
//         const { product_id, Warehouse_id, stock } = req.body;

//         try {
//             const product = await Product.findById(product_id);
//             const warehouse = await Warehouse.findById(Warehouse_id);

//             if (!product && !warehouse) {
//                 return res.status(400).json({ message: 'Product or Warehouse not found' });
//             }

//             const newStock = new Stock({
//                 product_id,
//                 Warehouse_id,
//                 stock
//             });

//             const savedStock = await newStock.save();
//             handleResponse(res, {
//                 message: "added successfully",
//                 data: savedStock,
//               });
//         } catch (error) {
//             handleResponse(res, {
//                 message: "Cannot add products",
//                 data: error.message,
//               });
//         }
//     }

//     exports.getAllStocks = async (req, res) => {
//         try {
//           const stocks = await Stock.find().populate('product_id').populate('Warehouse_id');
//           handleResponse(res, {
//             message: "Stocks retrieved successfully",
//             data: stocks,
//           });
//         } catch (error) {
//           handleResponse(res, {
//             message: "Cannot retrieve stocks",
//             data: error.message,
//           });
//         }
//       }



const Stock = require('../models/stockModel');
const Movement = require('../models/movementModel');

// Add stock
exports.addStock = async (req, res) => {
  try {
    const { product, warehouse, quantity } = req.body;

    // Validate input
    if (!product || !warehouse || !quantity) {
      return res.status(400).json({ error: 'Invalid input for adding stock.' });
    }

    // Check if the stock entry already exists
    const existingStock = await Stock.findOne({ product, warehouse });

    if (existingStock) {
      // Update the existing stock entry
      existingStock.stock += quantity;
      await existingStock.save();
    } else {
      // Create a new stock entry
      const newStock = new Stock({
        product,
        warehouse,
        stock: quantity,
      });
      await newStock.save();
    }

    res.status(201).json({ message: 'Stock added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get stock of a particular warehouse
exports.getStockByWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    // Validate warehouseId
    if (!warehouseId) {
      return res.status(400).json({ error: 'Invalid warehouse ID.' });
    }

    const stock = await Stock.find({ warehouse: warehouseId }).populate('product warehouse');
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get stock of a particular product
exports.getStockByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate productId
    if (!productId) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    const stock = await Stock.find({ product: productId }).populate('product warehouse');
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
