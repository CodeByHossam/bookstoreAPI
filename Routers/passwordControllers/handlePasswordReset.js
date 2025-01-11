const { User } = require("../../Models/User");
const jwt = require("jsonwebtoken");
const hashPassword = require("../../MiddelWare/passwordHasher");

const handlePasswordReset = async (req, res) => {
  try {
    const { email, token, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const secret = user.password + process.env.SECRET_KEY;

    try {
      jwt.verify(token, secret); // Verify the token
    } catch (error) {
      return res.status(401).send("Invalid or expired token");
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await user.save();

    res.status(200).render("successPassword");
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = handlePasswordReset;
