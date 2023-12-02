const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true, unique: true },
  warehousename: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
});
const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;