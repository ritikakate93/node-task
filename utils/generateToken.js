const jwt = require("jsonwebtoken");

module.exports = function generateToken(user, role) {
  return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
