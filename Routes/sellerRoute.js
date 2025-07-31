const express = require('express');
const router = express.Router();
const { loginSeller,addProduct} = require("../Controller/sellerCon");
const { authenticate, authorizeRole } = require("../Middlewares/authMiddleware");
const fileUpload = require('../Middlewares/fileUpload')


router.post("/login", loginSeller);
router.post("/addProduct", authenticate, authorizeRole("seller"),fileUpload.any(), addProduct);


module.exports = router;