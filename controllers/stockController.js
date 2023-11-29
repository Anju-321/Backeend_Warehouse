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