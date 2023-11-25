const mongoose = require('mongoose');
const {roleManager,roleAdmin}=require('../utils/constants');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum:[roleManager,roleAdmin],required: true },
  isActive: { type: Boolean,default:true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;