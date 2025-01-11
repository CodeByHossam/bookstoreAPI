const express = require("express");
const router = express.Router();

const renderForgotPasswordForm = require("../Routers/passwordControllers/renderForgotPasswordForm");
const sendResetLink = require("../Routers/passwordControllers/sendResetLink");
const renderResetPasswordForm = require("../Routers/passwordControllers/renderResetPasswordForm");
const handlePasswordReset = require("../Routers/passwordControllers/handlePasswordReset");

/**
 * @description Render the view for the "Forgot Password" form
 * @method GET
 * @route "/password/forgot"
 * @access Public
 */
router.get("/forgot", renderForgotPasswordForm);

/**
 * @description Send the reset password link to the user's email
 * @method POST
 * @route "/password/reset"
 * @access Public
 */
router.post("/reset", sendResetLink);

/**
 * @description Render the form to reset the user's password
 * @method GET
 * @route "/password/reset-password/:id/:token"
 * @access Public
 */
router.get("/reset-password/:id/:token", renderResetPasswordForm);

/**
 * @description Handle the password reset
 * @method POST
 * @route "/password/password-sucess"
 * @access Public
 */
router.post("/password-sucess", handlePasswordReset);

module.exports = router;
