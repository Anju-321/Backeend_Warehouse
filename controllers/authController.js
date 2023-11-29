const User = require("../models/userModel");
const handleResponse = require("../utils/response");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
exports.registerUser = async (req, res) => {
  try {
    const { username, password, role, isActive } = req.body;
    const userId = uuid.v4();
    const user = new User({
      username,
      password,
      role,
      isActive,
      userId
    });

    const saveddata = await user.save();
    handleResponse(res, {
      message: "User registered successfully",
      data: saveddata,
    });
  } catch (error) {
    handleResponse(res, {
      message: "User registered failed",
      data: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    let userExist = await User.findOne({
      username: username,
      password: password,
      isActive: true,
    });

    if (userExist) {
      const token = jwt.sign(
        { userId: userExist._id, role: userExist.role },
        process.env.SECRET_KEY,
        { expiresIn: "3h" }
      );

      return handleResponse(res, {
        message: "Login Success",
        data:true,
        token:token,
      });
    } else {
      return handleResponse(res, {
        message: "Wrong Username or Password",
        data:false
      });
    }
  } catch (e) {
    console.error(e);
    return handleResponse(res, {
      message: "Internal Server Error",
      data: null,
    });
  }
};
