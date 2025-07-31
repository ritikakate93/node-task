const express = require('express');
const router = express.Router();
const { loginSeller,addProduct,listProducts,deleteProduct} = require("../Controller/sellerCon");
const { authenticate, authorizeRole } = require("../Middlewares/authMiddleware");
const fileUpload = require('../Middlewares/fileUpload')


router.post("/login", loginSeller);
router.post("/addProduct", authenticate, authorizeRole("seller"),fileUpload.any(), addProduct);
router.get("/listProducts",authenticate,authorizeRole("seller"), listProducts);
router.delete("/product/:id", authenticate, authorizeRole("seller"), deleteProduct);


module.exports = router;