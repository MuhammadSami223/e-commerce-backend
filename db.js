const mongoose=require('mongoose')


 const connectdb=mongoose
.connect(process.env.mongoURI)
.then(()=>{console.log('connect db')})

module.exports={connectdb}