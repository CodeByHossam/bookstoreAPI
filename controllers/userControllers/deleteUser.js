const { User } = require("../../Models/User");

async function deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });
  
      res.status(200).json({ success: true, message: "User deleted successfully", data: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  module.exports = deleteUser;
  