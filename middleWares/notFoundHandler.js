function notFoundHandler(req, res, next) {
  const acceptHeader = req.headers.accept || "";

  // Case 1: HTML response
  if (acceptHeader.includes("text/html")) {
    return res.status(404).render("404", {
      title: "404 - Page Not Found",
      message: `The page ${req.originalUrl} could not be found`,
    });
  }

  // Case 2: JSON response
  if (acceptHeader.includes("application/json")) {
    return res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
      method: req.method,
    });
  }

  // Case 3: Text response (default)
  res.status(404).send(`404 - Not Found: ${req.originalUrl}`);
}

module.exports = notFoundHandler;
