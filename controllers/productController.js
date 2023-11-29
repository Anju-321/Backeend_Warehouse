const Product = require("../models/productModel");
const handleResponse = require("../utils/response");

exports.addproduct = async (req, res) => {
  try {
    const { productname,productid } = req.body;
    
    const product = new Product({
      productname,
      productid,
     
     
    });
    const productdata = await product.save();
    handleResponse(res, {
      message: "Product added successfully",
      data: productdata,
    });
   
  } catch (error) {
    handleResponse(res, {
      message: "Cannot Add Product",
      data: error.message,
    });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    handleResponse(res, {
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    handleResponse(res, {
      message: "Cannot retrieve products",
      data: error.message,
    });
  }
};

exports.getSingleproduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return handleResponse(res, {
        message: "Product ID is required",
        data: null,
      });
    }
    const singleProduct = await Product.findById(productId);
    if (!singleProduct) {
      return handleResponse(res, {
        message: "Product not found",
        data: null,
      });
    }
    handleResponse(res, {
      message: "Single product retrieved successfully",
      data: singleProduct,
    });
  } catch (error) {
    handleResponse(res, {
      message: "Cannot retrieve single product",
      data: error.message,
    });
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { productname } = req.body;
    const existingproduct = await Product.findById(productId);
    if (!existingproduct) {
      return handleResponse(res, {
        message: "Product not found",
        data: null,
      });
    }
    existingproduct.productname = productname;
    const updateproduct = await existingproduct.save();
    handleResponse(res, {
      message: "Product updated successfully",
      data: updateproduct,
    });
    
  } catch (error) {
    handleResponse(res, {
      message: "Product update failed",
      data: error.message,
    });
  }
};
