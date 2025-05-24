const { User } = require("../Models/User");

/**
 * Middleware to check if the authenticated user has one of the required roles
 * @param {Array} roles - Array of allowed roles (e.g., ['admin', 'user'])
 */
const checkRole = (roles = []) => {
  return async (req, res, next) => {
    try {
      // STEP 1: Ensure the user is logged in
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required. Please login first.",
          error: "AUTH_REQUIRED",
        });
      }

      // STEP 2: Fetch the user from the database using their ID
      const user = await User.findById(req.user.id).select("isAdmin");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
          error: "USER_NOT_FOUND",
        });
      }

      // STEP 3: Determine user role
      const role = user.isAdmin ? "admin" : "user";

      // STEP 4: Check if user's role is one of the allowed roles
      if (!roles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Insufficient permissions.",
          error: "INSUFFICIENT_PERMISSIONS",
          details: `Required roles: ${roles.join(", ")}`,
        });
      }

      // STEP 5: Attach role info to the request and continue
      req.userRole = role;
      next();
    } catch (error) {
      // Handle unexpected errors
      console.error("checkRole error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during role verification.",
        error: "SERVER_ERROR",
        details: error.message,
      });
    }
  };
};

/**
 * Middleware to check if the user is allowed to modify their own data
 */
const canModifyOwnData = async (req, res, next) => {
  try {
    // STEP 1: Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
        error: "AUTH_REQUIRED",
      });
    }

    // STEP 2: Fetch the user from the database
    const user = await User.findById(req.user.id).select("isAdmin");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        error: "USER_NOT_FOUND",
      });
    }

    // STEP 3: If the user is an admin, allow them to continue
    if (user.isAdmin) {
      req.userRole = "admin";
      return next();
    }

    // STEP 4: If the user is trying to modify their own data, allow it
    if (req.params.id === req.user.id) {
      req.userRole = "user";
      return next();
    }

    // STEP 5: Deny access if trying to modify someone else's data
    return res.status(403).json({
      success: false,
      message: "Access denied. You can only modify your own data.",
      error: "PERMISSION_DENIED",
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("canModifyOwnData error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during ownership check.",
      error: "SERVER_ERROR",
      details: error.message,
    });
  }
};

/**
 * Middleware to check if the user has permission to perform the current HTTP method (GET, POST, etc.)
 */
const checkOperationPermission = async (req, res, next) => {
  try {
    // STEP 1: Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
        error: "AUTH_REQUIRED",
      });
    }

    // STEP 2: Fetch the user from the database
    const user = await User.findById(req.user.id).select("isAdmin");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        error: "USER_NOT_FOUND",
      });
    }

    // STEP 3: Determine the user's role
    const role = user.isAdmin ? "admin" : "user";

    // STEP 4: Define which roles are allowed for each HTTP method
    const permissions = {
      GET: ["admin", "user"],
      POST: ["admin"],
      PUT: ["admin"],
      DELETE: ["admin"],
    };

    // STEP 5: Get allowed roles for the current request method
    const allowedRoles = permissions[req.method] || [];

    // STEP 6: Check if the user's role is allowed
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Operation not permitted.",
        error: "INSUFFICIENT_PERMISSIONS",
        details: `This ${req.method} operation requires roles: ${allowedRoles.join(", ")}`,
      });
    }

    // STEP 7: Allow request to proceed
    req.userRole = role;
    next();
  } catch (error) {
    // Handle unexpected errors
    console.error("checkOperationPermission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during operation permission check.",
      error: "SERVER_ERROR",
      details: error.message,
    });
  }
};

module.exports = {
  checkRole,
  canModifyOwnData,
  checkOperationPermission,
};
