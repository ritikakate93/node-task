const express = require("express");
const router = express.Router();
const { loginAdmin, createSeller, listSellers } = require("../Controller/adminCon");
const { authenticate, authorizeRole } = require("../Middlewares/authMiddleware");

router.post("/login", loginAdmin);
router.post("/seller",authenticate, authorizeRole("admin"), createSeller);
router.get("/sellerList", authenticate, authorizeRole("admin"), listSellers);

module.exports = router;

