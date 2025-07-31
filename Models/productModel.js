const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brandName: String,
  detail: String,
  image: String,
  price: Number,
});

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  brands: [brandSchema],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller" },
});

module.exports = mongoose.model("Product", productSchema);

