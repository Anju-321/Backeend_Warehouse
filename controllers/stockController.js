const Stock = require("../models/stockModel");
const Warehouse = require("../models/warehouseModel");
const Product = require("../models/productModel");
const handleResponse = require("../utils/response");

exports.addStock = async (req, res) => {
  try {
    const { product, warehouse, quantity } = req.body;
    console.log(req.body);
    if (!product || !warehouse || !quantity || isNaN(quantity)) {
      return res.status(400).json({ error: "Invalid input for adding stock." });
    }
     // Check if warehouse exists
     const warehouseExists = await Warehouse.exists({ _id: warehouse,isActive:true });

     if (!warehouseExists) {
       return res.status(404).json({ error: 'Specified warehouse does not exist.' });
     }
 
     // Check if product exists
     const productExists = await Product.exists({ _id: product });
 
     if (!productExists) {
       return res.status(404).json({ error: 'Specified product does not exist.' });
     }

    

    const updatedStock = await Stock.findOneAndUpdate(
      { product, warehouse },
      { $inc: { stock: parseInt(quantity) } },
      { upsert: true, new: true }
    );
    handleResponse(res, {
      message: "Stock added successfully",
      data: updatedStock,
    });
  } catch (error) {
    console.error(error);
    handleResponse(res, {
      message: "Cannot add stock",
      data: error.message,
    });
  }
};

// exports.addStock = async (req, res) => {
//   try {
//     const { product, warehouse, quantity } = req.body;
//     console.log(req.body);
//     if (!product || !warehouse || !quantity || isNaN(quantity)) {
//       return res.status(400).json({ error: "Invalid input for adding stock." });
//     }
//     const existingStock = await Stock.findOne({ product, warehouse });

//     let updatedStock;
//     if (existingStock) {
//       existingStock.stock += parseInt(quantity);
//       updatedStock = await existingStock.save();
//     } else {
//       const newStock = new Stock({
//         product,
//         warehouse,
//         stock: parseInt(quantity),
//       });
//       updatedStock = await newStock.save();
//     }

//     handleResponse(res, {
//       message: "Stock added successfully",
//       data: updatedStock,
//     });
//   } catch (error) {
//     console.error(error);

//     handleResponse(res, {
//       message: "Cannot add stock",
//       data: error.message,
//     });
//   }
// };

exports.getAllStock = async (req, res) => {
  try {
    // Query all stock entries
    const allStock = await Stock.find()
      .populate("product")
      .populate("warehouse");

    handleResponse(res, {
      message: "All stock entries retrieved successfully",
      data: allStock,
    });
  } catch (error) {
    console.error(error);

    handleResponse(res, {
      message: "Cannot get all stock entries",
      data: error.message,
    });
  }
};

exports.getStockByWarehouse = async (req, res) => {
  try {
    const { warehouseId } = req.params;

    if (!warehouseId) {
      return res.status(400).json({ error: "Invalid warehouse ID." });
    }
     // Find all stock entries for the warehouse and populate product and warehouse details
     const stockEntries = await Stock.find({ warehouse: warehouseId }).populate(
      "product warehouse"
    );

    // Calculate total stock quantity for the warehouse
    const totalStock = stockEntries.reduce((total, entry) => total + entry.stock, 0);

    res.json({
      message: `Stock entries for warehouse ${warehouseId} retrieved successfully`,
      data: {
        stockEntries,
        totalStock,
      },
    });
    
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get stock of product by warehouse

exports.getStockOfProductByWarehouse = async (req, res) => {
  try {
    const { warehouseId, productId } = req.params;

    if (!warehouseId || !productId) {
      return res
        .status(400)
        .json({ error: "Invalid warehouse ID or product ID." });
    }

    // Find stock entry for a specific product in a specific warehouse and populate product and warehouse details
    const stock = await Stock.findOne({
      warehouse: warehouseId,
      product: productId,
    }).populate("product warehouse");

    if (!stock) {
      return res.status(404).json({
        error: "Stock entry not found for the specified product and warehouse.",
      });
    }

    handleResponse(res, {
      message: `Stock entry for product ${productId} in warehouse ${warehouseId} retrieved successfully`,
      data: stock,
    });
  } catch (error) {
    console.error(error);
    handleResponse(res, {
      message: "Cannot get stock entry for the specified product and warehouse",
      data: error.message,
    });
  }
};


