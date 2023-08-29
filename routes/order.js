const express = require('express')
const productRouter = express.Router()
const Product=require('../models/order')


productRouter.post("/order", async(req,res)=>{
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const email = req.body.email;
    const productData = { name,phoneNumber,address,email};
    const productInstance = new Product(productData)
    const savedProduct= await productInstance.save()
  res.send({message:"Order Added", product:savedProduct})

})