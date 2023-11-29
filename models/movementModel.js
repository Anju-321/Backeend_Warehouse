const mongoose = require('mongoose');
const movementSchema = new mongoose.Schema({
    movement_id: { type: Number, required: true, unique: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ],
    sourceWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    destinationWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    movementType: { type: String, enum: ['Return', 'Transfer'], required: true },
    timestamp: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
  const Movement = mongoose.model('Movement', movementSchema);
  
  module.exports = Movement;
  