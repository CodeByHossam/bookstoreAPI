
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


async function validateLoginData(req,res,User) {
    try {
      // Fetch user from the database
      const foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        return res.status(404).send("User not registered");
            
      }
  
      // Compare password if the user is exist 
      comparePassword(req,res,foundUser);
  
    } catch (error) {
      console.error("Error during user verification:", error);
      return res.status(500).send(`Internal server error`);
      
    }
  }
  
  async function comparePassword(req,res,foundUser){
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (match) {
      
      var token = jwt.sign({ name: foundUser.name,id:foundUser.id }, process.env.SECRET_KEY);

      return res.status(200).send({token:token,message:`Login successful for ${foundUser.name}`});
  
    } else {
      return res.status(400).send(`Invalid credentials`);
    
    }
  
  }
  module.exports=validateLoginData;