const { validateLoginData } = require("../../Models/User");
const validateCredentials = require("../../middleWares/validateCredentials");
const { User } = require("../../Models/User");

async function loginUser(req, res) {
  // validate the data sent from the client to the express
  const { error } = validateLoginData(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    //validate user Credentials from the database
    await validateCredentials(req, res, User);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = loginUser;
