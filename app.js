const express = require("express");
const bookRouter = require("./Routers/bookRouter");
const authRouters = require("./Routers/authRouter");
const userRouters = require("./Routers/userRouter");
const passwordRouters = require("./Routers/passwordRouters");
const imageUploadRouters = require("./Routers/uploadImageRouter");

const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const connectToDB = require("./MiddelWare/dbConfig");

const dotenv = require("dotenv");
const { looger } = require("./MiddelWare/LoggerMiddelWare");
const notFoundHandler = require("./MiddelWare/notFoundHandler");
const errorHandler = require("./MiddelWare/errorHandler");

dotenv.config();

const server = express();

connectToDB();

// Security Headers
server.use(helmet());

// Enable CORS
server.use(cors({ origin: "*" }));

// Set View Engine (EJS)
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

// Middleware to Parse URL Encoded Data
server.use(express.urlencoded({ extended: true }));

// Middleware to Parse JSON
server.use(express.json());

// Logger Middleware
server.use(looger);

// Routes
server.use("/books", bookRouter);
server.use("/authors", authRouters);
server.use("/user", userRouters);
server.use("/password", passwordRouters);
server.use("/upload", imageUploadRouters);


//  Serve Uploaded Images
server.use("/image", express.static("image"));

// Error Handling Middleware
server.use(notFoundHandler);
server.use(errorHandler);

// Start Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
