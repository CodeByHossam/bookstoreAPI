const express = require("express");
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

const dotenv = require("dotenv");
const { logger } = require("./middleWares/Logger");
const notFoundHandler = require("./middleWares/notFoundHandler");
const errorHandler = require("./middleWares/errorHandler");

dotenv.config();

const server = express();

// Security Headers
server.use(helmet());

// Enable CORS
server.use(cors(corsOptions));

// Set View Engine (EJS)
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Middleware to Parse URL Encoded Data
server.use(express.urlencoded({ extended: true }));

// Middleware to Parse JSON
server.use(express.json());

// Logger Middleware
server.use(logger);

// Rate Limiters
server.use("/user/login", authLimiter);
server.use("/user/register", authLimiter);
server.use("/password", passwordResetLimiter);
server.use("/", apiLimiter);

// Serve Static files
server.use(express.static("public"));

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
const startServer = () => {
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
};

// Connect to DB and then start server
connectToDB()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  });
