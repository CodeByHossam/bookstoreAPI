const { User, validateUpdateUser } = require("../../models/User");

const updateCurrentUser = async (req, res) => {
  try {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    if (req.body.isAdmin) {
      delete req.body.isAdmin;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user data",
      error: error.message,
    });
  }
};

module.exports = updateCurrentUser;
