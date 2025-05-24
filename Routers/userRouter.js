const express = require("express");
const router = express.Router();
const {
  checkRole,
  canModifyOwnData,
  checkOperationPermission,
} = require("../middleWares/roleAuth");
const { auth } = require("../middleWares/auth");
const { apiLimiter, authLimiter } = require("../middleWares/rateLimit");

// Import controllers from their respective files
const register = require("../controllers/userControllers/registerUser");
const login = require("../controllers/userControllers/loginUser");
const getAllUsers = require("../controllers/userControllers/getAllUsers");
const getUserById = require("../controllers/userControllers/getUserById");
const updateUser = require("../controllers/userControllers/updateUser");
const deleteUser = require("../controllers/userControllers/deleteUser");
const getCurrentUser = require("../controllers/userControllers/getCurrentUser");
const updateCurrentUser = require("../controllers/userControllers/updateCurrentUser");

// Public routes with rate limiting
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// Protected routes - require authentication
router.use(auth);
router.use(apiLimiter); // Apply general rate limit to all protected routes

// Current user routes (authenticated users can access their own data)
router.get("/me", getCurrentUser); // Get own profile
router.put("/me", updateCurrentUser); // Update own profile

// Admin-only routes (only admin can access)
router.get("/", checkRole(["admin"]), getAllUsers); // Get all users
router.get("/:id", checkRole(["admin"]), getUserById); // Get specific user
router.delete("/:id", checkRole(["admin"]), deleteUser); // Delete user

// Routes that allow users to modify their own data or admin to modify any data
router.put("/:id", canModifyOwnData, updateUser); // Update user (own or any if admin)

// Apply operation permissions to all remaining routes
router.use(checkOperationPermission);

module.exports = router;
