const express = require('express');
const router = express.Router();
const Category = require("../models/categoryModel");
const tokenVerify = require('../middleware/tokenVerify');
// const productModel = require('../models/productModel');
// const { get } = require('mongoose');

//*********** Add Category **********//
router.post('/add-new', tokenVerify, async (req, res)=>{
    let category = new Category({
        catName:req.body.catName,
        icon:req.body.icon,
        color:req.body.color
    });
    category = await category.save();
    if(!category)
    return res.status(404).json({message:"Category Not Found"});
    res.status(200).json({success:true,message:"Category has been created successfully"}); 
});

//*********************************** Get All Brand Without Token **************************************//
router.get('/categories', async(req, res)=>{
    const getCateogoy = await Category.find({});
    res.status(200).json(getCateogoy);
})

//*********** Get All Category With Token **********//
router.get('/', tokenVerify, async(req, res)=>{
    const getCateogoy = await Category.find({});
    res.status(200).json(getCateogoy);
})

//*********** Delete Category **********//
router.delete('/delete/:id', tokenVerify, async(req, res)=>{
    try{   
        let localId = req.params.id;
        const deleteCat = await Category.findByIdAndDelete(req.params.id);
    if(deleteCat) {
        console.log("Item deleted successfully");
        res.status(200).json({success:true, message: "Category Deleted Successfully"});
    } 
    }catch(err){
       throw new console.error("Something went wrong");
    }
})

//*********** Get Category By Id **********//
router.get('/get/:id', tokenVerify, async(req, res)=>{
  try{
    const getCat = await Category.findById(req.params.id);
    if(getCat){
        res.status(200).json(getCat);
    } else {
        res.status(200).json({success:true, message:"Category Not Found!"})
    }
  }catch(err){
    throw new Error("Somthing went wrong");
  }
})

//*********** Edit Category By Id **********//
router.put('/edit/:id', tokenVerify, async(req,res)=>{
   try{
    const updatedCat = await Category.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(201).json({
        updatedCategory:updatedCat,
        message:"Data Update Successfully"});
   }catch(err){
    throw new console.error("Something went wrong");
   }
})

module.exports = router;
