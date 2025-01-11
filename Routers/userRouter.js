const express = require("express");
const router = express.Router();
const getAllUsers = require("./userRouterControlers/getAllUsers");
const getUserById = require("./userRouterControlers/getUserById");
const registerUser = require("./userRouterControlers/registerUser");
const loginUser = require("./userRouterControlers/loginUser");
const updateUser = require("./userRouterControlers/updateUser");
const deleteUser = require("./userRouterControlers/deleteUser");



// Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
