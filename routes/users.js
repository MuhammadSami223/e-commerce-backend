const { User } = require("../models/user");
const express=require('express')
const router = express.Router()
const bcrypt=require('bcrypt');
const saltarround=10
const jwt = require('jsonwebtoken');
// const sign  = require("jsonwebtoken");
    
    
  router.post("/register", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const userExist= await User.findOne({userName});
    if(userExist){
        res.send({message:"UserName is already taken"})
        return;
    }
    const hashedPassword = await bcrypt.hash(password,saltarround)
    const userData = { userName, password :hashedPassword};
    const savedUser = new User(userData);
    const saved = await savedUser.save();  
    res.status(200).send({User:saved, message:" created"});
  }); 
  router.post('/login' , async(req,res)=>{
    const userName = req.body.userName
    const password = req.body.password
    const isUser = await User.findOne({userName})
    if(isUser){
        const match = bcrypt.compare(password,isUser.password)
        if(match){
            const token = jwt.sign({_id:isUser._id} ,process.env.jwtsecret,{expiresIn:'30d'})
            res.send({
                match, message:"logged in successfully" ,
                user:isUser,
            token})
        }
        else{
            res.send({
                match,
                message:"password wrong"
                
            })
        }
    }
        else{
            res.send("no user with this username")
        }
    // res.send({User: isUser})
    // console.log(isUser,"user available")
    //  res.status(200).send("All user" + allUser)
  })
  module.exports=router

  