const express = require('express');
const router = express.Router();
const Brand = require('../models/brandModel');
const tokenVerify = require('../middleware/tokenVerify');

//******************************* Add New Brand ****************************//
router.post('/add-new', tokenVerify, async(req, res)=>{
   let newBrand = new Brand({
    brandName:req.body.brandName,
    icon:req.body.icon,
    color:req.body.color
   });
   newBrand = await newBrand.save();
   console.log(newBrand);
   if(!newBrand) {
    res.status(500).json({message:"Product has not been added"});
   }
   res.status(201).json({
    newBrand,
    message:"Product has been added successfully"
});
});


//******************************* Get All Brand Without Token ****************************//
router.get('/getAllBrands', async(req, res)=>{
    try{
        const brands = await Brand.find({});
    if(!brands){
        res.status(404).json("Something went wrong");
    }
    res.status(200).json(brands);
    } catch(err){
        throw new Error("Something went worng");
    }
})

//******************************* Get All Brand Access With Token ****************************//
router.get('/all-brands', tokenVerify, async(req, res)=>{
    console.log(req.headers['authorization']);
    try{
        const brands = await Brand.find({});
    if(!brands){
        res.status(404).json("Something went wrong");
    }
    res.status(200).json(brands);
    } catch(err){
        throw new Error("Something went worng");
    }
})

//******************************* Get Single Brand By Id ****************************//
router.get(`/get-brand/:id`, tokenVerify, async(req, res)=>{
    try{
        const brand = await Brand.findById(req.params.id);
        if(!brand) res.status(404).json("Brand Not Found");
        res.send(brand);
    } catch(err){
        throw new Error("Something went wrong");
    }
})

//******************************* Delete Single Brand By Id ****************************//
router.delete('/delete/:id', tokenVerify, async(req, res)=>{
  try{
    const deleteBrand = await Brand.findByIdAndDelete(req.params.id);
    if(!deleteBrand) res.status(400).json("Brand has not found");
    res.status(200).json("Brand has been deleted Successfully");
  } catch(err){
    throw new Error("Something went worng", err);
  }
})

//******************************* Delete Single Brand By Id ****************************//
router.put('/edit/:id', tokenVerify, async(req, res)=>{
   try{
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!brand) res.status(400).json("Brand has not update");
    res.status(200).json("Brand has been updated Successfully");
   } catch(err){
    throw new Error("Something went worng", err);
   }

})

//******************************* Get All Brand ****************************//
router.get('/', async(req, res)=>{
    try{
        const brands = await Brand.countDocuments();
    if(!brands){
        res.status(404).json("Something went wrong");
    }
    res.status(200).json({
        "Total Count":brands
    });
    } catch(err){
        throw new Error("Something went worng");
    }
})



// Export Router
module.exports = router;