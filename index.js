// import these libraries
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

//use body parser when req data from front-end
app.use(bodyParser.urlencoded({ extended: false }));

// use for json files
app.use(express.json());

// database connections
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Schema for database
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

//models ---like collections for database
const productModels = mongoose.model("Product", productSchema);

/*Create product
response with status 201 for create products */

app.post("/api/v1/product/new", async (req, res) => {
  const product = await productModels.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

/*Read Product
use find()
status 200 for read product */
app.get("/api/v1/products", async (req, res) => {
  const products = await productModels.find();
  res.status(200).json({
    success: true,
    products,
  });
});

/*update product,
will use Let key word,
use findbyid(),
use findbyidAndUpdate (),
//useFindAndModify = true,
runValidators = true */

app.put("/api/v1/products/:id", async (req, res) => {
  let product = await productModels.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await productModels.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

/* Delete a Product
First Find a product using findbyID
use deleteOne method to remove product
response the data

 */
app.delete("/api/v1/product/:id", async (req, res) => {
  const product = await productModels.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not Found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

//server
app.listen(4500, () => {
  console.log("Server is working on http://localhost:4500");
});
