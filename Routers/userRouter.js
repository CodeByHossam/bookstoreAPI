const express = require("express");
const router = express.Router();
const getAllUsers = require("../controllers/userControllers/getAllUsers");
const getUserById = require("../controllers/userControllers/getUserById");
const registerUser = require("../controllers/userControllers/registerUser");
const loginUser = require("../controllers/userControllers/loginUser");
const updateUser = require("../controllers/userControllers/updateUser");
const deleteUser = require("../controllers/userControllers/deleteUser");



// Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
