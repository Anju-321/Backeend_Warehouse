const mongoose = require('mongoose');

const deadStockSchema = new mongoose.Schema({
  deadstock_id:{ type: String, required: true, unique: true },
  product:[{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  quantity: { type: Number, required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true }
});

const DeadStock = mongoose.model('DeadStock', deadStockSchema);

module.exports = DeadStock;
