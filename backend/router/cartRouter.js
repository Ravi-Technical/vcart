const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Add To Cart Product
router.post('/addToCart', async(req, res)=>{
  try{
    let cartData = new Cart({
        productId : req.body.productId,
        price : req.body.price
    });
  const saveCartItem = await cartData.save();
   res.status(200).send({success:true, msg:"Item added sucessfully", saveCartItem});
  } catch(err){
    res.status(400).send({success:false, msg:err.error})
  }
})

// Get The Cart Product
router.get('/getCartItem', async(req,res)=>{
   try {
    const pId = req.params.id;
    const getProduct = await Cart.find({});
    res.status(200).send({success:true, getProduct});
   } catch(err) {
    res.status(400).send({success:false, msg:"Something went wrong!"})
   }
})


module.exports = router;