const express = require('express');
const router = express.Router();
const wishlistModel = require('../models/wishlistModel');
const productModel = require('../models/productModel');

// Create Wishlist API
router.post('/wishlist', async(req, res)=>{
     try{
        const wishlist_exists = await wishlistModel.findOne({productId:req.body.productId}); 
        if(!wishlist_exists){
            const user_wishlist = new wishlistModel({
                userId : req.body.userId,
                productId : req.body.productId,
                productFlag : req.body.productFlag
             });
             console.log(wishlist_exists);
            if(user_wishlist){
               await user_wishlist.save();
               res.status(201).json({ status:true , message:"Product has added successfully"});
            } else {
               res.status(200).json({status:false, message:"Product not added"})
            } 
        } else {
            res.status(200).json({status:false, message:"Product already exists"})
        }
     } catch(err){
        res.status(200).json("Something went wrong!")
     }
})

// Create Wishlisted Product API
 router.get('/wishlist-product', async(req, res)=>{
    try {
      console.log(req.params.userId);
      let wish = [];
      const wishlist_product = await wishlistModel.find({productFlag:true}).populate(['productId']);
      for(let item of wishlist_product) {
         wish.push(item.productId);
      }
     if(wishlist_product && wishlist_product !==null && wishlist_product !==undefined){
      res.status(200).json(wish)

     } else if(wishlist_product == null || wishlist_product == undefined){
          res.status(200).json({message:"Not available"});
     }
     else {
      res.status(200).json("Something is missing");
     }
    } catch(err){
       res.status(201).json("Something went wrong!..");
    } 
 });

 // Update Wishlisted Product API
 router.delete('/update-wishlist-product/:productId', async(req, res)=>{
    try {
      const productId = req.params.productId;
      const updatedWishlist = await wishlistModel.find({}).findOneAndDelete({productId:productId}, {new:true});
      if(updatedWishlist){
         res.status(201).send({sucess:true, message:"Product has been deleted successfully from wishlist"});
      } else {
         res.status(200).send({sucess:false, message:"Something went wrong!.."})
      }
    } catch(err){
      res.status(200).send({sucess:false, message: err});
    }
 });


 // Single User Get Wishlist Product 
 router.get('/unique-wishlist-product/:uId', async(req, res)=>{
    const userId = req.params.uId;
    let wow = [];
    const getItem = await wishlistModel.find({userId:userId}).populate(['productId']).select(['productId']);
    getItem.forEach((ele)=>{
      let test = ele.productId;
      wow.push(test)
    })
    res.send(wow);
 });
 












 

module.exports = router;