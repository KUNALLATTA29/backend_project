const mongoose = require('mongoose')

async function connectmongodb(url){
    try{
        await mongoose.connect(url);
        console.log("mongo is connected")
    }catch(err){
        console.log("there is an error in connecting mongo",err)

    }
}

module.exports ={ connectmongodb}