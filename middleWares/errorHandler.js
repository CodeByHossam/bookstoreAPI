const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorMessage = err.message;

  // Handle different types of errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    errorMessage = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  } else if (err.name === "CastError") {
    statusCode = 400;
    errorMessage = "Invalid ID format";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorMessage = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    errorMessage = "Token expired";
  } else if (err.code === 11000) {
    statusCode = 400;
    errorMessage = "Duplicate field value entered";
  }

  const errorResponse = {
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
