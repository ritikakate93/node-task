const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobileNo: String,
  country: String,
  state: String,
  skills: [String],
  password: String,
});

module.exports = mongoose.model("Seller", sellerSchema);
