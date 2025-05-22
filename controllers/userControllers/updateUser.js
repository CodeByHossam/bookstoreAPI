const { User, validateNewUser } = require("../../Models/User");

async function updateUser(req, res) {
    const { error } = validateNewUser(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name, email: req.body.email, password: req.body.password } },
        { new: true } // Return updated document
      );
  
      if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });
  
      res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
  
  module.exports = updateUser;
  