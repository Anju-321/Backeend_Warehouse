// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const StockSchema = new mongoose.Schema({
//     product_id: [{ type:Schema.Types.ObjectId,ref:'Product' ,required:true}],
//     Warehouse_id: [{ type:Schema.Types.ObjectId,ref:'Warehouse',required:true }],
//     stock: { type: Number, required: true }
// });

// const Stock = mongoose.model("Stock", StockSchema);

// module.exports = Stock;
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  stock: { type: Number, default: 0 }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;