const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const tokenVerify = require('../middleware/tokenVerify');

//********************** New User Register **************************//
router.post('/register', async (req, res) => {
     console.log(req.body);
     try {
          const email = await userModel.findOne({ email: req.body.email });
          if (!email) {
               let userBody = new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    mobile: req.body.mobile,
                    address: req.body.address,
                    pincode: req.body.pincode,
                    city: req.body.city,
                    state: req.body.state,
                    status: req.body.status,
                    alternatePhone: req.body.alternatePhone
               });
               await userBody.save();
               res.status(201).send({ success: true, message: "User has been created successfully" });
          } else {
               res.status(200).send({ success: false, message: "User already exists please try another email address!" })
          }

     } catch (err) {
          res.status(200).send({ success: false, message: "User not added something went wrong!" });
     }
});

//********************** User Login **************************//
router.post('/login', async (req, res) => {
     try {
          const userDetails = await userModel.findOne({ email: req.body.email });
          //const expired = { expiresIn: '1d' };
          if (userDetails) {
               if (userDetails.status == true) {
                    let comparePassword = bcrypt.compareSync(req.body.password, userDetails.password);
                    if (comparePassword) {
                         let token = jwt.sign({ email: userDetails.email }, process.env.TOKEN_SECRET_KET, {expiresIn: '24h'});
                         let updateToken = await userModel.findOneAndUpdate({ email: req.body.email }, { $set: { token: token } }, { new: true });
                         res.status(201).send([userDetails.name, token, updateToken]);
                    } else{
                         res.status(200).send({ success: false, message: "Invalid Credential" });
                    }
               } else {
                    res.status(200).send({ success: false, message: "Your account has been blocked" });
               }
          } else {
               res.status(404).send({ success: false, message: "User not found!" });
          }
     } catch(err){
          res.status(200).send({ success: false, message: "Something went wrong!", err });
     }
})

//********************** Update Current User Details **************************//
router.put('/updateUser', tokenVerify, async (req, res) => {
     try {
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          const updateCurrentUser = await userModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
          if (updateCurrentUser) {
               res.status(201).json(updateCurrentUser);
          } else {
               res.status(200).json("Some details are not found as per need!..")
          }
     } catch (err) {
          res.status(200).json("Something Went Wrong!");
     }

})

//********************** Find Email Address **************************//
router.get('/allUser', tokenVerify, async (req, res) => {
     try {
          const allUser = await userModel.find({});
          if (allUser && allUser.length !== 0 & allUser != undefined) {
               res.status(200).send(allUser);
          } else {
               res.status(404).send("User Not Found!");
          }
     } catch (err) {
          res.status(200).send({ success: false, message: "Something went wrong!" })
     }
})

//********************** Find Current User **************************//
router.get('/currentUser', tokenVerify, async (req, res) => {
     try {
          const currentUser = await userModel.findOne({ email: req.body.email }).select(['-password']);
          if (currentUser && currentUser !== null) {
               res.status(201).send(currentUser);
          }
     } catch (e) {
          res.status(200).send("Something went wrong!..")
     }
});


//********************** Forgot Password **************************//
router.post('/forgot-password', async (req, res) => {
     const email = req.body.email;
     try {
          let findUser = await userModel.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
          if (!findUser) {
               res.status(404).json({ success: false, message: "User Not Found!.." })
               return;
          }
          const payload = {
               email: findUser.email
          }
          // const expire = 300000;
          const token = jwt.sign(payload, process.env.TOKEN_SECRET_KET, { expiresIn: '30m' });
 
          const mailTranspoter = nodeMailer.createTransport({
               host: "smtp.gmail.com",
               auth: {
                    user: process.env.USER,
                    pass: process.env.PASSWORD
               }
          });
          const mailDetails = {
               from: {
                    name: 'Vcart',
                    address: process.env.USER
               },
               to: email,
               subject: "Reset Password",
               html: `
            <html>
            <head>
             <title>Reset Password</title>
            </head>
              <h2>Forget Password Request</h2>
              <p>Dear ${findUser.name}, </p><br>
              <p>We have received a request to reset your password, to complete the password reset process, please click on the below button:</p>
              <a style="cursor:pointer;" href="${process.env.LIVE_URL}/user/reset-password/${token}">
              <button style="background-color:#6c58ef;color:white; padding:10px 20px; border:none; 
              cursor: pointer; border-radius:2px; ">Reset Password</button></a>
              <p>Please note that the link is valid for 30 mint after that it will expired.</p><br>
              <p>Thank You</p>
              <p>Ravi Shankar</p>
            </html>
          `
          }
          mailTranspoter.sendMail(mailDetails, async (err, data) => {
               if (err) {
                    res.status(200).json({ success: false, message: "Something is going to wrong", err });
                    return;
               } else {
                    await userModel.findOneAndUpdate({ email: email }, { $set: { resetPasswordToken: token } }, { new: true });
                    res.status(200).json({ success: true, Message: "Email has been sent successfully" });
                    return;
               }
          })
     } catch (err) {
          res.status(200).json({ success: false, message: err });
     }
});

//********************** Reset Password **************************//
router.post('/reset-password', async (req, res) => {
     const token = req.body.token;
     const password = req.body.password;
     jwt.verify(token, process.env.TOKEN_SECRET_KET, async (err, data) => {
          if (err) {
               res.status(500).send("Password reset link has been expired please try again!")
          } else {
               let resp = data;
               let user = await userModel.findOne({ email: { $regex: '^' + resp.email + '$', $options: 'i' } });
               let password_encrypt = bcrypt.hashSync(password, 10);
               user.password = password_encrypt;
               try {
                    await userModel.findOneAndUpdate(
                         { _id: user._id }, { $set: user }, { new: true }
                    );
                    res.status(200).json({ message: "Your password has been changed successfully" });
               } catch (err) {
                    res.status(500).send("Something went wrong!..");
               }
          }
     })
})

module.exports = router; // Export Module 