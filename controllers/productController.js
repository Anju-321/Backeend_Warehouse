const Product = require("../models/productModel");
const handleResponse = require("../utils/response");

exports.addproduct = async (req, res) => {
  try {
    const { productname, productid } = req.body;

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
    const {productid} = req.params;
    console.log(req.params);

    const product = await Product.findById( productid)

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json({
      message: 'Single product retrieved successfully',
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

// exports.updateproduct = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const { productname } = req.body;
//     const existingproduct = await Product.findById(productId);
//     if (!existingproduct) {
//       return handleResponse(res, {
//         message: "Product not found",
//         data: null,
//       });
//     }
//     existingproduct.productname = productname;
//     const updateproduct = await existingproduct.save();
//     handleResponse(res, {
//       message: "Product updated successfully",
//       data: updateproduct,
//     });
//   } catch (error) {
//     handleResponse(res, {
//       message: "Product update failed",
//       data: error.message,
//     });
//   }
// };

exports.updateproduct = async (req, res) => {
  try {
    const {productId} = req.params;
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