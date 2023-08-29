const express = require("express");
// import { connectdb } from './db'
const mongoose = require("mongoose");
const productRouter = require("./routes/products");
const router=require('./routes/users');
const cors = require("cors");
// const uploadRouter = require("./routes/upload");

const app = express();
app.use(cors())
require("dotenv").config();
// app.use("/uploads", express.static(__dirname + "/uploads"));
mongoose.connect(process.env.mongoURI).then(() => {
  console.log("connect db");
});
app.use(express.json()) ;

app.use('/users',router);
app.use('/products',productRouter)
// app.use('/uploads',uploadRouter)
app.listen(8000, () => {
  console.log("server is running on port 8000");
});
