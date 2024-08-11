const express = require('express');
const router = express.Router();
const Products = require('../models/productModel');
const Brands = require('../models/brandModel');
const Categories = require('../models/categoryModel');


// Get All Collection of documents
router.get('/', async(req, res)=>{
    const product = await Products.countDocuments({}, {Hint:"id"}); 
    const brand = await Brands.countDocuments({}, {Hint:"id"}); 
    const categories = await Categories.countDocuments({}, {Hint:"id"}); 

    res.status(200).json([
        {"name":"Products","value":product},
        {"name":"Brands","value":brand},
        {"name":"Categories","value":categories},
    ])
})

module.exports = router;
