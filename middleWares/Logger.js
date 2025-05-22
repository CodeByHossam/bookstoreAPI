function logger(req, res, next) {
  const start = Date.now();

  // Log request
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.protocol}://${
      req.hostname
    }${req.originalUrl}`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Request Body:", req.body);
  }

  // Log response
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] Response: ${
        res.statusCode
      } - ${duration}ms`
    );
  });

  next();
}

module.exports = { logger };
