const mongo = require('mongoose')

const urlSchema = mongo.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true
    },
    redirecturl:{
        type:String,
        required:true
    },
    visitorHistory:[{timestamp:{type:Number}}]
},{timestamp:true})

const url = mongo.model('url',urlSchema)

module.exports = url