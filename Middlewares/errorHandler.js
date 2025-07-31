module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

   let message = err.message || "Internal server error";

  if (statusCode === 400 && !err.message) {
    message = "Bad Request";
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal server error"
  });

  
};
