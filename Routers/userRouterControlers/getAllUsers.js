const { User } = require("../../Models/User");


async function getAllUsers(req,res) {

    try {
        const allUsers = await User.find();
        res.status(200).json({ success: true, data: allUsers });
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    
}

module.exports=getAllUsers;
