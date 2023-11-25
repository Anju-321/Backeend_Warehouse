const User = require("../models/userModel");
const handleResponse=require('../utils/response')
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, password, role ,isActive} = req.body; 
    const user = new User({
      username,
      password,
      role,
      isActive
    });

  const saveddata= await user.save();
    handleResponse(res, {
        message: "User registered successfully",
        data: saveddata,
      });
    } catch (error) {
      handleResponse(res, {
        message:"User registered failed",
        data:error.message
      });
    }
  };
  
  exports.userLogin = async (req, res) => {
    try {
      const { username, password,role } = req.body;
      let userExist = await User.findOne({
       
        username: username,
        password: password,
        isActive: true
      });
  
      if (userExist) {
        const token = jwt.sign(
          { userId:userExist._id },
          'secretkey',
          { expiresIn: '3h' }
        );

        return handleResponse(res,{
          message: "Login Success",
          data: token
        });
      
      } else {
        // Use res.handleResponse for the "Login Failed" case
        return handleResponse(res,{
          message: "Login Failed",
          data: false
        });
      } 
    } catch (e) {
      console.error(e);
      return handleResponse(res,{
        // status: 500,
        message: "Internal Server Error",
        data: null
      });
    }
  };
  