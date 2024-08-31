const express = require('express');
const router = express.Router();
const SellerRegister = require('../models/sellerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const secret = process.env.TOKEN_SECRET_KET;

// Seller Register
router.post('/register', async(req, res)=>{
        let exist = await SellerRegister.findOne({email:req.body.email});
        try{
            let seller = new SellerRegister({
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10),
                mobile : req.body.mobile,
                address : req.body.address
            })
              if(!exist){
                seller = await seller.save();
                res.status(201).json("Seller has been registred successfully");
              } else {
                res.json("Email id already exists");
              }
          
        } catch(err){
            throw new Error(err, "Something went worng");
        }
});

// Seller login
router.post('/login', async(req, res)=>{
  let login = await SellerRegister.findOne({email:req.body.email});
  const option = {expiresIn: '1d'}
  try{
    const comparePassword = await bcrypt.compareSync(req.body.password, login.password);
    if(login.email && comparePassword){
       let token = await jwt.sign({email:login.email},  process.env.TOKEN_SECRET_KET, option);
       res.status(200).json({
        "name":login.name,
        "email":login.email,
        "token":token
      });
    }else{
      res.status(201).send({success:false, message:"Invalid Credential"});
    }
  }catch(err){
    res.status(201).send({success:false, message:"Invalid Credential"});
  }
})

// Get Profile Data API
router.get('/profile', async(req, res)=>{
  try{
    const header = req.headers['authorization'];
      req.token = header;
      jwt.verify(req.token, process.env.TOKEN_SECRET_KET, async (err, data)=>{
            if(err){
                  res.json({"message":"invalid token"});
            } else {
              let profile = await SellerRegister.findOne({email:data.email}).select(["name", "email", "mobile", "address", "password"]);
              res.status(200).json(profile);
            }
      });
  }catch(err){
    throw new Error(err,"Something went wrong");
  }
})

// Update Profile Detail API
router.put('/profile-update', async(req, res)=>{
  try {
    const salt  = 15;
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    let sellerId = await SellerRegister.findOne({email:req.body.email}).select('_id');
    let updatedResult = await SellerRegister.findByIdAndUpdate(sellerId, req.body, {new:true});
    if(updatedResult){
      res.status(201).json({success:true, message:"Seller has been updated successfully"});
    } else {
      res.status(200).json({success:false, message:"Seller has not been update"})
    }
  }catch(err){
   res.status(500).json({success:false, message:"Something went wrong!..."})
  }
});

// Forgot Password
router.post('/forgot-password', async(req, res)=>{
  try{
    let seller = await SellerRegister.findOne({email:req.body.email});
    if(seller && seller !==null && seller !== undefined){
      const payload = {
        email:seller.email
      }
      const expireTime = 300000;
      const token = jwt.sign(payload, process.env.TOKEN_SECRET_KET, {expiresIn : expireTime});
      const mailTranspoter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD
        }
      }) 
      const mailDetails = ({
        from:"ravis3682@gmail.com",
        to:seller.email,
        subject:"Reset Password",
        html:`
        <html>
        <head>
         <title>Reset Password</title>
        </head>
          <h2>Forget Password Request</h2>
          <p>Dear ${seller.name}, </p><br>
          <p>We have received a request to reset your password, to complete the password reset process, please click on the below button:</p>
          <a href="${process.env.LIVE_URL}/seller/reset-password/${token}"><button style="background-color:#6c58ef; color:white; padding:10px 20px; border:none; 
          cursor: pointer; border-radius:2px; ">Reset Password</button></a>
          <p>Please note that the link is valid for 30 mint after that it will expire</p><br>
          <p>Thank You</p>
          <p>Ravi Shankar</p>
        </html>
        `
      });

      mailTranspoter.sendMail(mailDetails, async(err, data)=>{
        if(err){
         res.status(500).json({success:false, message:"Something is missing"});
         return
        } else {
          await SellerRegister.updateOne({email:seller.email}, {$set:{token:token}}, {new:true});
          res.status(200).json({success:true, message:"Reset password link has been sent successfully on your email."});
        }
      })
    }
  } catch(err){
    res.status(500).json({success:false, message:"Something went wrong!....."});
  }
});

// Reset Password 
router.post('/reset-password', async(req, res)=>{
    try {
        let token = req.body.token;
        let password = req.body.password;
        console.log();
        jwt.verify(token, process.env.TOKEN_SECRET_KET, async(err, user)=>{
          if(err){
             res.status(500).json({success:false, message:"Token is expired please try again"})
          } else {
            let resp = user;
            let updateUser = await SellerRegister.findOne({email:resp.email});
            let password_entcrypt = bcrypt.hashSync(password, 10);
            updateUser.password = password_entcrypt;
            await SellerRegister.findOneAndUpdate({_id:updateUser._id}, {$set:updateUser}, {new:true});
            res.status(201).json({success:true, message:"Password has been updated successfully"});
           }

        });
         
    } catch(err){
        res.status(500).json({success:false, message:"Something went wrong!"})
    }
})

// Get all registred seller
router.get('/generic-seller', async (req, res)=>{
    try {
       const getting_seller = await SellerRegister.find({});
       res.status(200).json({success:true, getting_seller});
    } catch{
      res.status(400).json({success:false, message:"Something went wrong!"});
    }
})





module.exports = router;








