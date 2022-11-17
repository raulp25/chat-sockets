const mongoose = require('mongoose');

const dbConnection = async() => {

    try {        
       await mongoose.connect( process.env.MONGO_URL );

        console.log('DB Online | hi to whoever is reading this');

    } 
    catch (error) {
        throw new Error('Error encountered when login into MongoDb')
    }
}


module.exports = {
    dbConnection,
}