const Movement = require("../models/movementModel");
const Stock = require("../models/stockModel");
const DeadStock = require("../models/deadstockModel");
const Warehouse = require("../models/warehouseModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const handleResponse = require("../utils/response");

// Create a new movement
exports.createMovement = async (req, res) => {
  try {
    const {
      products,
      sourceWarehouse,
      destinationWarehouse,
      movementType,
      userId,
    } = req.body;

    console.log("data coming in reqst",req.body);

    // Validate input

    if (
      !products ||
      !sourceWarehouse ||
      !destinationWarehouse ||
      !movementType ||
      !userId
    ) {
      return res
        .status(400)
        .json({ error: "Invalid input for movement creation." });
    }
    // Check if the userId exists in the User model and is active
    const userExists = await User.exists({ _id: userId, isActive: true });
    // Check if warehouses exist
    const sourceWarehouseExists = await Warehouse.exists({
      _id: sourceWarehouse,
      isActive: true,
    });
    const destinationWarehouseExists = await Warehouse.exists({
      _id: destinationWarehouse,
      isActive: true,
    });
    if (!userExists) {
      return res.status(404).json({ error: "User does not exist" });
    }
    if (!sourceWarehouseExists || !destinationWarehouseExists) {
      return res
        .status(404)
        .json({ error: "One or more specified warehouses do not exist." });
    }

    // Check if products exist
    for (const item of products) {
      const { product, quantity } = item;
      
      console.log("item   ",item);

      const productExist = await Stock.exists({
        warehouse: new mongoose.Types.ObjectId(sourceWarehouse),
        product: new mongoose.Types.ObjectId(product),
        // stock: { $gte: quantity },
      });

      console.log("productexist  ",productExist);
      

      // if (!isQuantityAvailable) {
      //   return res
      //     .status(404)
      //     .json({ error: "Specified product out of stcock." });
      // }
    }

    // Create the movement
    const newMovement = new Movement({
      movement_id: generateUniqueMovementId(), // You need to implement this function
      products,
      sourceWarehouse,
      destinationWarehouse,
      movementType,
      userId,
    });

    // Save the movement to the database

    await newMovement.save();
    await updateStockQuantities(
      res,
      products,
      sourceWarehouse,
      destinationWarehouse,
      movementType
    );

    handleResponse(res, {
      message: "Movement added successfully",
      data: newMovement,
    });
  } catch (error) {
    handleResponse(res, {
      message: "Cannot make a Movement",
      data: error.message,
    });
  }
};


const { v4: uuidv4 } = require("uuid");
const { default: mongoose } = require("mongoose");

let movementCounter = 1;
function generateUniqueMovementId() {
  const movementId = `${movementCounter}-${uuidv4()}`;
  movementCounter++;
  return movementId;
}

let deadstockCounter = 1;
function generateUniqueDeadstockId() {
  const deadstockId = `${deadstockCounter}-${uuidv4()}`;
  deadstockCounter++;
  return deadstockId;
}


// Function to update stock quantities
async function updateStockQuantities(
  res,
  products,
  sourceWarehouse,
  destinationWarehouse,
  movementType
) {
  try {
    for (const product of products) {
      const { product: productId, quantity } = product;

      // Decrease stock in the source warehouse
      await Stock.findOneAndUpdate(
        { product: productId, warehouse: sourceWarehouse },
        { $inc: { stock: -quantity } }
       
      );

      if (movementType === "Transfer") {
        // Transfer: Increase stock in the destination warehouse
        await Stock.findOneAndUpdate(
          { product: productId, warehouse: destinationWarehouse },
          { $inc: { stock: quantity } },
          { upsert: true }
        );
      } else if (movementType === "Return") {
        // Return: Increase dead stock quantity
        await updateDeadStock(res, productId, quantity, sourceWarehouse);
      }
    }
  } catch (error) {
    handleResponse(res, {
      message: "Error updating stock quantities",
      data: error.message,
    });
  }
}

async function updateDeadStock(res, productId, quantity, warehouse) {
  try {
    const deadstockId = generateUniqueDeadstockId(); // Generate a unique deadstock ID

    console.log("Updating dead stock:", productId, quantity, warehouse);

    await DeadStock.findOneAndUpdate(
      { product: { $elemMatch: { product: productId } }, warehouse: warehouse },
      {
        $push: { product: { product: productId, quantity: quantity } },
        $inc: { quantity: quantity },
        deadstock_id: deadstockId,
      },
      { upsert: true }
    );
  } catch (error) {
    handleResponse(res, {
      message: "Error updating dead stock",
      data: error.message,
    });
  }
}


exports.getMovements = async (req, res) => {
  try {
    const movements = await Movement.find();
    handleResponse(res, {
      message: "Got Movements successfully",
      data: movements,
    });
  } catch (error) {
    console.error(error);
    handleResponse(res, {
      message: "Error retrieving movements",
      data: error.message,
    });
  }
};
