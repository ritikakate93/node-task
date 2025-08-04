const Admin = require("../Models/adminModel");
const Seller = require("../Models/sellerModel");
const bcrypt = require('bcryptjs');
const generateToken = require("../Utils/generateToken");

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      return next(err);
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }
   
    const token = generateToken(admin, "admin");

    res.status(200).json({
      token,
      role: "admin",
      message: "Login successful"
    });
  } catch (err) {
    next(err);
  }
};


exports.createSeller = async (req, res, next) => {
  try {
    const { name, email, mobileNo, country, state, skills, password } = req.body;
    
    if (!name || !email || !mobileNo || !country || !state || !skills || !password) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      return next(err);
    }

    if (!isValidEmail(email)) {
      const err = new Error("Invalid email format");
      err.statusCode = 400;
      return next(err);
    }
    
    if (!Array.isArray(skills) || skills.length === 0) {
      const err = new Error("Skills must be a non-empty array");
      err.statusCode = 400;
      return next(err);
    }

    if (password.length < 6) {
      const err = new Error("Password must be at least 6 characters");
      err.statusCode = 400;
      return next(err);
    }

    const existing = await Seller.findOne({ email });

     if (existing) {
      const err = new Error("Seller already exists with this email");
      err.statusCode = 409;
      return next(err);
    }

    const hashed = await bcrypt.hash(password, 10);
    
    const seller = await Seller.create({ name, email, mobileNo, country, state, skills, password: hashed });
    res.status(201).json({
      message: "Seller created successfully",
      seller: seller
    });
  }catch (err) {
    next(err);
  }
};


exports.listSellers = async(req,res,next)=>{
  try {
    // console.log(req.query)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const sellers = await Seller.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
      res.status(200).json({
        success: true,
        sellers 
      });
  } catch (err) {
    next(err);
  }
}
