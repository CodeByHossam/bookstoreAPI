const express=require("express");
const bookRouter = require("./Routers/bookRouter");
const authRouters=require("./Routers/authRouter");
const userRouters=require("./Routers/userRouter");
const passwordRouters=require("./Routers/passwordRouters");
const path = require("path");
const helmet=require("helmet")
const cors=require("cors")
const connectToDB=require("./MiddelWare/dbConfig")

const dotenv=require("dotenv");
const { looger } = require("./MiddelWare/LoggerMiddelWare");
const notFoundHandler = require("./MiddelWare/notFoundHandler");
const errorHandler = require("./MiddelWare/errorHandler");



dotenv.config();

const server=express();

connectToDB();

//using helmet for protection and adding more header
server.use(helmet());

//using cors middel ware to specify the front end that can use this API
server.use(cors({
    origin:"*"
    // origin:"http://localhost:3000" in case of u want to specify the port Example:using by react
}))



// Set the view engine to EJS
server.set("view engine", "ejs");
// Set the path for the views directory
server.set("views", path.join(__dirname, "views"));

// Middleware to parse application/x-www-form-urlencoded (typical for HTML forms)
server.use(express.urlencoded({ extended: true }));


server.use(express.json());
server.use(looger);
server.use("/books",bookRouter);
server.use("/authors",authRouters);
server.use("/user",userRouters);
server.use("/password", passwordRouters);


//error not found middleware
server.use(notFoundHandler);

//error handler middleware
server.use(errorHandler);

const port=process.env.PORT;

server.listen(port,()=>{console.log(`server is runing on port ${port}`);});


