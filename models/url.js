const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    URL:{
        type:String,
        required:true
    },
    ShortID:{
        type:String,
        required:true,
        unique:true
    },
    VisitorHistory:[{timestamp:{type:Number}}]
})

const Url = mongoose.model('url',userSchema)

module.exports = Url