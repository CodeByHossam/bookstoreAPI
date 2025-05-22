
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword){
    const salt=await bcrypt.genSalt(saltRounds);
        const hashedPassword=bcrypt.hash(plainPassword,salt)

        return hashedPassword;
}


 

 module.exports=hashPassword;

