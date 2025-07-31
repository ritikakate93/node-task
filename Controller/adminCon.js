const Admin = require("../Models/adminModel");
const Seller = require("../Models/sellerModel");
const bcrypt = require('bcryptjs');
const generateToken = require("../Utils/generateToken");


exports.createSeller = async (req, res, next) => {
  try {
    const { name, email, mobileNo, country, state, skills, password } = req.body;
    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ message: "Seller exists" });
    const hashed = await bcrypt.hash(password, 10);
    const seller = await Seller.create({ name, email, mobileNo, country, state, skills, password: hashed });
    res.status(201).json({ message: "Seller created", seller });
  } catch (err) {
    next(err);
  }
};


exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(admin, "admin");
    res.json({ token, role: "admin" });
  } catch (err) {
    next(err);
  }
};

exports.listSellers = async(req,res,next)=>{
      try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sellers = await Seller.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ sellers });
  } catch (err) {
    next(err);
  }
}
