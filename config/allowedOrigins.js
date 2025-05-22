const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // Add your frontend URL when deployed
];

module.exports = allowedOrigins;
