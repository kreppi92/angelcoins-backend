const mongoose = require('mongoose')

const Company = new mongoose.Schema({
    companyName: {type:String, trim:true, default:''},
    description: {type:String, trim:true, default:''},
    stock: {type:Number, default:0},
    growth: {type:Boolean, default:true},
    trend: {type:Array, default:[0,0,0,0,0,0,0,0,0,0]}
})

module.exports = mongoose.model('Company', Company)