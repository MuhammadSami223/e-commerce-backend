
const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

    productName:String,
    price:Number,
    quantity:Number,
    description:String,
    image:String


}

)
const Product =mongoose.model("product",productSchema)
module.exports = Product