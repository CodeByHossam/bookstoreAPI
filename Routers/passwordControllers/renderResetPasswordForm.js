const { User } = require("../../Models/User");

const renderResetPasswordForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("resetPassword", { email: user.email, token: req.params.token });
  } catch (error) {
    console.error("Error rendering reset password form:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = renderResetPasswordForm;
