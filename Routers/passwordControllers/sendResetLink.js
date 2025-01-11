const { User } = require("../../Models/User");
const jwt = require("jsonwebtoken");

const sendResetLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const secret = user.password + process.env.SECRET_KEY;
    const token = jwt.sign({ email: user.email, id: user.id }, secret);
    const link = `http://localhost:5000/password/reset-password/${user.id}/${token}`;

    return res.status(200).send(`
      <html>
      <body style="background-color: rgb(9, 53, 81); color: white; font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
          <div style="text-align: center; padding: 20px; margin: 20px; border-radius: 10px; background-color: #1e3a5f;">
              <h1><a href="${link}" style="text-decoration: none; color: #00ffcc;">Please click here to reset the password</a></h1>
          </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error sending reset link:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = sendResetLink;
