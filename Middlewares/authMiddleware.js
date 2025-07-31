const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token)
  if (!token){
    const err = new Error("No token provided");
    err.statusCode = 401;
    return next(err);
  } 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    req.user = decoded;
    next();
  } catch {
     const err = new Error("Invalid token");
    err.statusCode = 401;
    return next(err);
  }
};

exports.authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ message: "Access denied" });
  next();
};
