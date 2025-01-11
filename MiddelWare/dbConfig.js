const mongoose = require("mongoose");

async function connectToDB(){
    try {
         await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection to Mongo DB is success");
        
        } catch (error) {
          console.log(`Errore from DB: ${error}`) ; 
        }
      }

module.exports=connectToDB