const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const environment = process.env.NODE_ENV;

const bookRouter = require("./Routers/bookRouter");
const authRouters = require("./Routers/authRouter");
const userRouters = require("./Routers/userRouter");
const passwordRouters = require("./Routers/passwordRouters");
const imageUploadRouters = require("./Routers/uploadImageRouter");

const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const connectToDB = require("./config/dbConfig");
const corsOptions = require("./config/corsOptions");
const {
  apiLimiter,
  authLimiter,
  passwordResetLimiter,
} = require("./middleWares/rateLimit");

const { logger } = require("./middleWares/Logger");
const notFoundHandler = require("./middleWares/notFoundHandler");
const errorHandler = require("./middleWares/errorHandler");

const server = express();

// Security Headers
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Enable CORS
server.use(cors(corsOptions));

// Set View Engine (EJS)
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Middleware to Parse URL Encoded Data
server.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Middleware to Parse JSON
server.use(express.json({ limit: "10kb" }));

// Logger Middleware
server.use(logger);

// Rate Limiters
server.use("/user/login", authLimiter);
server.use("/user/register", authLimiter);
server.use("/password", passwordResetLimiter);
server.use("/", apiLimiter);

// Serve Static files Disable browser caching in development
server.use(
  express.static("public", {
    maxAge: process.env.NODE_ENV === "development" ? 0 : "1d",
    etag: true,
  })
);

// Routes
server.get("/", (req, res) => res.render("index"));
server.get("/docs", (req, res) => res.render("docs"));
server.use("/books", bookRouter);
server.use("/authors", authRouters);
server.use("/user", userRouters);
server.use("/password", passwordRouters);
server.use("/upload", imageUploadRouters);

//Error and Not Found Handling Middleware
server.use(notFoundHandler);
server.use(errorHandler);

// Start Server function
const startServer = async () => {
  try {
    await connectToDB();
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(
        `🚀 Server is running on port ${port} in ${environment} environment\n you can visit the main page on http://localhost:${port}`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    // Don't exit the process in development mode
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  // Don't exit the process in development mode
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});

// Start the server
startServer();
