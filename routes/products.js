const express = require('express')
const productRouter = express.Router()
const Product=require('../models/product')
const protect = require("../middlewares/auth")

productRouter.get("/all", async (req,res) => {
  
const allProducts = await Product.find({})
    if(allProducts.length){
        res.send({products : allProducts})
    }
    else{
res.send("No Products available")
    }
})
productRouter.post("/add",protect, async(req,res)=>{
    const productName = req.body.productName;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    const productData = { productName,price,description,image};
    const productInstance = new Product(productData)
    const savedProduct= await productInstance.save()
  res.send({message:"Product Added", product:savedProduct})

})
productRouter.put("/edit/:id",protect, async(req,res)=>{
    const productID =  req.params.id;
    const product = await Product.findOne({ _id: productID})
    if(product){
        product.productName = req.body.productName;
        product.price = req.body.price;
product.description = req.body.description;
product.image = req.body.image;
const savedProduct = await product.save()
res.send({message:"Product Edited", product:savedProduct})
}
else{
    res.send({message:"Product Not Found"})

}
   

})
productRouter.delete("/:id",protect, async(req,res)=>{
    const productID = req.params.id;
    try{
        const productDelete = await Product.deleteOne({ _id: productID})
        res.send({ message:"Product Delete", product: productDelete})
    }
    catch(error){
        res.send({message: error})

    }
}) 

productRouter.get("/:id", async (req,res)=>{
    const productID =  req.params.id;
const product = await Product.findOne({ _id: productID})    
  res.send({message:"Product Found", product: product})

})
module.exports = productRouter

