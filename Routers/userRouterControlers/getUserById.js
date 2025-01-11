const { User } = require("../../Models/User");

async function getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  module.exports = getUserById;
  