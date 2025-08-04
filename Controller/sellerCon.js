const Seller = require("../Models/sellerModel");
const Product = require("../Models/productModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateToken");
const fileUpload = require('../Middlewares/fileUpload')



exports.loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      return next(err);
    }

    const seller = await Seller.findOne({ email });
    if (!seller) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }
    const token = generateToken(seller, "seller");
    res.status(200).json({
      token,
      role: "seller",
      message: "Login successful"
    });
  } catch (err) {
    next(err);
  }
};


exports.addProduct = async(req, res, next)=>{
    //  console.log(req.body,req.files)
 try {
    const { productName, productDescription } = req.body;

     if (!productName || !productDescription) {   
        const err = new Error("Product name and description are required");
        err.statusCode = 400;
        return next(err);       
    }

    const brands = JSON.parse(req.body.brands);

    if (!Array.isArray(brands) || brands.length === 0) {
        const err = new Error("At least one brand is required");
        err.statusCode = 400;
        return next(err);
    }

     if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        if (brands[index]) {
          brands[index].image = `/uploads/${file.filename}`;
        }
      });
    }
    //   console.log(brands)
 

    const product = await Product.create({
      productName,
      productDescription,
      brands,
      sellerId: req.user.id,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {

    next(err);
  }
};


exports.listProducts = async (req, res, next) => {
  try {
    // console.log(req.query)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const products = await Product.find({ sellerId: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

     res.status(200).json({
        success: true,
        products 
      });
  } catch (err) {
    next(err);
  }
};


exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, sellerId: req.user.id });

        if (!product) {
            const err = new Error("Product not found")
            err.statusCode = 404;
            return next(err);
        }
        
        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
