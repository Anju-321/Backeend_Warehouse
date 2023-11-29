const User = require("../models/userModel");
const handleResponse = require("../utils/response");
const jwt = require("jsonwebtoken");

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password, role, isActive } = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return handleResponse(res, {
        message: "User not found",
        data: null,
      });
    }

    existingUser.username = username;
    existingUser.password = password; 
    existingUser.role = role;
    existingUser.isActive = isActive;

    const updatedUser = await existingUser.save();

    handleResponse(res, {
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    handleResponse(res, {
      message: "User update failed",
      data: error.message,
    });
  }
};

exports.getuser=async(req,res)=>{
  try{
    const user=await User.find()
    handleResponse(res, {
      message: "Users retrieved successfully",
      data: user,
    });
  }catch(error){
    handleResponse(res, {
      message: "Cannot retrieve products",
      data: error.message,
    });
  }
};

exports.getSingleuser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return handleResponse(res, {
        message: "User ID is required",
        data: null,
      });
    }
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      return handleResponse(res, {
        message: "User not found",
        data: null,
      });
    }
    handleResponse(res, {
      message: "Single user retrieved successfully",
      data: singleUser,
    });
  } catch (error) {
    handleResponse(res, {
      message: "Cannot retrieve single user",
      data: error.message,
    });
  }
};
