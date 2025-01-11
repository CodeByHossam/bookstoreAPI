
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


async function validateRegisteration(req,res,User) {
    try {
      // Fetch user from the database
      const founduser = await User.findOne({ email: req.body.email });
      if (!founduser) {
        return res.status(404).send("User not registered");
            
      }
  
      // Compare password if the user is exist 
      comparePassword(req,res,founduser);
  
    } catch (error) {
      console.error("Error during user verification:", error);
      return res.status(500).send(`Internal server error`);
      
    }
  }
  
  async function comparePassword(req,res,founduser){
    const match = await bcrypt.compare(req.body.password, founduser.password);
    if (match) {
      
      var token = jwt.sign({ name: founduser.name,id:founduser.id }, process.env.SECRET_KEY);

      return res.status(200).send({token:token,message:`Login successful for ${founduser.name}`});
  
    } else {
      return res.status(400).send(`Invalid credentials`);
    
    }
  
  }
  module.exports=validateRegisteration;