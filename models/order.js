
const mongoose = require('mongoose')
const orderSchema=mongoose.Schema({

    products:[],
    name:String,
    phoneNumber:Number,
    address:String,
    email:String


},{
    timestamps:true
}

)
const order = mongoose.model("order",orderSchema)
module.exports = order