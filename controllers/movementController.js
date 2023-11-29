const Movement = require('../models/movementModel');
const Stock = require('../models/stockModel');

// Create a new movement
exports.createMovement = async (req, res) => {
  try {
    const { products, sourceWarehouse, destinationWarehouse, movementType, userId } = req.body;

    // Validate input
    if (!products || !sourceWarehouse || !destinationWarehouse || !movementType || !userId) {
      return res.status(400).json({ error: 'Invalid input for movement creation.' });
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

    // Update stock quantities
    await updateStockQuantities(products, sourceWarehouse, destinationWarehouse);

    res.status(201).json(newMovement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to generate a unique movement ID (you may implement your own logic)
function generateUniqueMovementId() {
  // Implement your logic to generate a unique movement ID
}

// Function to update stock quantities
async function updateStockQuantities(products, sourceWarehouse, destinationWarehouse) {
  try {
    for (const product of products) {
      const { product: productId, quantity } = product;

      // Update quantity in the source warehouse (decrease)
      await Stock.findOneAndUpdate(
        { product: productId, warehouse: sourceWarehouse },
        { $inc: { stock: -quantity } }
      );

      // Update quantity in the destination warehouse (increase)
      await Stock.findOneAndUpdate(
        { product: productId, warehouse: destinationWarehouse },
        { $inc: { stock: quantity } },
        { upsert: true } // Create a new stock entry if it doesn't exist
      );
    }
  } catch (error) {
    console.error('Error updating stock quantities:', error);
    throw error; // You might want to handle this error appropriately in your application
  }
}
