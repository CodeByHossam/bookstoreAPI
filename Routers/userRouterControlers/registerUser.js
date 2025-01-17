
const { validateNewUser } = require("../../Models/User");
const hashPassword = require("../../MiddelWare/passwordHasher");
const { User } = require("../../Models/User");



async function registerUser(req, res) {
  //validate the data sent from the client to the express
  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  try {
    //Check if the user already in the dtat base
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    
    //build an instance from the user model and save it in the data base
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin:req.body.isAdmin,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully", data: savedUser });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = registerUser;
