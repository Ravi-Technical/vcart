const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Product = require("../models/productModel");
const tokenVerify = require('../middleware/tokenVerify');
require('dotenv/config');
const PORT = process.env.PORT;
router.use(express.json());
const admin = require("firebase-admin");
const uuid = require('uuid-v4');
const fs = require('fs');




/*******
Http Method:Add New Product API 
API URL:http://localhost:3000/api/v1/product/add-new
*******/
router.post(`/add-new`, async (req, res) => {
  try{
    let product = new Product({
      name: req.body.name,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      color: req.body.color,
      salePrice: req.body.salePrice,
      regularPrice: req.body.regularPrice,
      size: req.body.size,
      category: req.body.category,
      discount: req.body.discount,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
      quantity:req.body.quantity
    });
  product = await product.save();
  if (!product) return res.status(201).send("Product has not been created");
  res.status(201).json({message:"Product has been added successfully"});

  } catch{
   res.status(200).json({message:"Something went worng!"})
  }

});

/*******
Http Method:Search Product By key
API URL:http://localhost:3000/api/v1/product/search/key
*******/
router.get('/search/:key', async(req, res)=>{
  try {
      let search_result = await Product.find({
         "$or" : [
          {name : {$regex:req.params.key,  $options: 'i'}},
          {brand : {$regex:req.params.key, $options: 'i'}},
          {category : {$regex:req.params.key, $options:'i'}}
         ]
      });
      if(search_result.length > 0) {
        res.status(200).send({success:true, search_result});
      }else {
        res.status(200).send({success:true, message:"Product not found!"});
      }
  } catch(err){
    throw new Error(err, "Something went wrong!");
  }
})


/*******
Http Method:Get All Product API
API URL:http://localhost:3000/api/v1/product
*******/
router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (productList.length != 0 && productList != null) {
    res.status(200).json(productList);
   }
});

/*******
Http Method:Get single product by id without token
API URL:http://localhost:3000/api/v1/product/id
*******/
router.get(`/details/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.send(404).json({ message: "Product not found" });
  res.send(product);
});

/*******
Http Method:Get single product by id
API URL:http://localhost:3000/api/v1/product/id
*******/
router.get(`/:id`, tokenVerify, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.send(404).json({ message: "Product not found" });
  res.send(product);
});

/*******
Http Method:Get Featured Products API
API URL:http://localhost:3000/api/v1/product
*******/
router.get(`/get/featured`, async (req, res) => {
  const featuredProduct = await Product.find({ isFeatured: true });
  res.json(featuredProduct);
});

router.put(`/edit/:id`, tokenVerify, async (req, res) => {
  try{
    const {id} = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {new:true});
    res.send(updateProduct);

  } catch(error){
    throw new Error(error);
  }

});


/*******
Http Method:Delete Product By Id
API URL:http://localhost:3000/api/v1/product/id
*******/
router.delete('/delete/:id', tokenVerify, async (req, res)=>{
  try{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if(deleteProduct){
    res.status(401).json("Product has been deleted successfully");
  } else {
    res.status(401).json("Product has not found!");
  }
  }catch(err){
    throw new Error(err, "Something went worng");
  }
});




// Export Router
module.exports = router;
