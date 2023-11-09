const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

//use body parser when req data from front-end
app.use(bodyParser.urlencoded({ extended: false }));

// use for json files
app.use(express.json());

// database
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });
//Schema
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

//models ---like collections
const productModels = mongoose.model("Product", productSchema);

//Create product
app.post("/api/v1/product/new", async (req, res) => {
  const product = await productModels.create(req.body);

  //response with status
  res.status(200).json({
    success: true,
    product,
  });
});

//server
app.listen(4500, () => {
  console.log("Server is working on http://localhost:4500");
});
