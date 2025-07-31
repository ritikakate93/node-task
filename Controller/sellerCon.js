const Seller = require("../Models/sellerModel");
const Product = require("../Models/productModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateToken");
const fileUpload = require('../Middlewares/fileUpload')



exports.loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });
    if (!seller || !(await bcrypt.compare(password, seller.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(seller, "seller");
    res.json({ token, role: "seller" });
  } catch (err) {
    next(err);
  }
};


exports.addProduct = async(req, res, next)=>{
    //  console.log(req.body,req.files)
 try {
    const { productName, productDescription } = req.body;
    const brands = JSON.parse(req.body.brands);
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

    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    next(err);
  }
};
