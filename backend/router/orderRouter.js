const express = require('express');
const router = express.Router();
const Order = require('../models/orderItemModel');
const OrderItemModel = require('../models/orderItemModel');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');

// Order API 
router.post('/order', async (req, res) => {
  let d = new Date();
  let date = ("0" + d.getDate()).slice(-2);
  let month = ("0" + (d.getMonth() + 1)).slice(-2);
  let year = d.getFullYear();
  let getUser = await userModel.findOne({ _id: req.body.user });
  let odItem = req.body.orderItems;
  let qty = '';
  let whole_product = [];
  let total = 0;
  (await productModel.find()).map((p) => {
    for (let item of odItem) {
      if (item.product == p._id) {
        whole_product.push(p);
      }
    }
  });
  odItem.forEach(element => {
    qty = element.quantity;
  });

  let orderItemsIds = Promise.all(req.body.orderItems.map(async orderitem => {
    let newOrderItem = new Order({
      quantity: orderitem.quantity,
      product: orderitem.product
    });
    newOrderItem = await newOrderItem.save();
    return newOrderItem._id;
  }));

  const newOrderItemsResolved = await orderItemsIds;
  let order = new orderModel({
    orderItems: newOrderItemsResolved,
    pincode: req.body.pincode,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    phone: req.body.phone,
    alternatePhone: req.body.alternatePhone,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
    orderId: req.body.orderId,
    paymentMode: req.body.paymentMode
  })

  if (order){
    await order.save();
    // Mail Sent
    const mailTranspoter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
      }
    })
    const mailOptions = {
      from: {
        name:'Vcart',
        address:process.env.USER
      },
      to: getUser.email,
      subject: "Vcart order placed",
      html: `
           <div style="margin:0;padding:0" bgcolor="#F0F0F0" marginwidth="0" marginheight="0">
              
<table style="width:100%!important">
 <tbody>
  <tr background="https://ci3.googleusercontent.com/meips/ADKq_NY9dRHfPwMDwuaBTBZxHxpWz2TB6c34MGpuPc4fFggSDFaAGmSE6adTJcl3OJn6iKHyh2XnyfeWcT6VvsDwkYaBV5gMCRp8bnPKIWvGqmzDM5ZwJ5gk_elvyRuqPoFz6xAMjB0NK963jXZ8dKq4QCC6e7jR8_6ANK4CKryPmuLY=s0-d-e1-ft#https://rukminim1.flixcart.com/www/834/60/promos/28/08/2017/de0c263a-65a0-4f4b-b141-5062917b7d9b.png?q=100" width="834px" height="60">
   <td>
    <table width="100%" cellspacing="0" cellpadding="0" height="60" style="width:600px!important;text-align:center;margin:0 auto">
     <tbody>
      <tr>
       <td>
        <table style="width:700px;max-width:700px;padding-right:20px;padding-left:20px">
         <tbody>
          <tr>
           <td style="width:40%;text-align:left;padding-top:5px"><p style="color:rgba(255,255,255,0.8);font-family:Arial;font-size:2rem;text-align:left;color:#ffffff;font-style:normal;font-stretch:normal; margin:0"><span style="font-weight:bold;  color: #ffb872;">V</span>cart</p></td>
           <td style="width:60%;text-align:right;padding-top:5px"><p style="color:rgba(255,255,255,0.8);font-family:Arial;font-size:16px;text-align:right;color:#ffffff;font-style:normal;font-stretch:normal">Order <span style="font-weight:bold">Placed</span></p></td>
          </tr>
         </tbody>
        </table></td>
      </tr>
     </tbody>
    </table></td>
  </tr>
  <tr>
   <td>
    <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5">
     <tbody>
     <br/><br/>
      <tr>
       <td align="center" valign="top" bgcolor="#f5f5f5">
        <table border="0" cellpadding="0" cellspacing="0" style="width:682px;max-width:682px;padding-right:20px;padding-left:20px;background-color:#fff;padding-top:20px">
         <tbody>
          <tr>
           <td class="m_116760492459896712content" align="left">
            <table width="350" border="0" cellpadding="0" cellspacing="0" align="left">
             <tbody>
              <tr>
               <td class="m_116760492459896712col" valign="top">
               <p style="font-family:Arial;color:#878787;font-size:12px;font-weight:normal;font-style:normal;font-stretch:normal;margin-top:0px;line-height:14px;padding-top:0px;margin-bottom:7px">Hi <span style="font-weight:bold;color:#191919"> ${getUser.name}, - </span>  </p>
               <p style="font-family:Arial;font-size:12px;color:#878787;line-height:14px;padding-top:0px;margin-top:0px;margin-bottom:7px">Your order has been successfully placed.</p></td>
              </tr>
             </tbody>
            </table>
            <table width="250" border="0" cellpadding="0" cellspacing="0" align="right">
             <tbody>
              <tr>
               <td class="m_116760492459896712col" valign="top">
               <p style="font-family:Arial;color:#747474;font-size:11px;font-weight:normal;text-align:right;font-style:normal;line-height:14px;font-stretch:normal;
               margin-top:0px;padding-top:0px;color:#878787;margin-bottom:7px">Order placed on <span style="font-weight:bold;color:#000">${d.toLocaleString('default', { month: 'short' }) + " " + date + ", " + year}</span></p>
               <p style="font-family:Arial;font-size:11px;color:#878787;line-height:14px;text-align:right;padding-top:0px;margin-top:0;margin-bottom:7px">Order ID <span style="font-weight:bold;color:#000">${order.orderId}</span></p></td>
              </tr>
             </tbody>
            </table></td>
          </tr>
          <tr>
           <td class="m_116760492459896712content" border="1" align="left" style="background-color:rgba(245,245,245,0.5);background:rgba(245,245,245,0.5);border:.5px solid #6ed49e;border-radius:2px;padding-top:20px;padding-bottom:20px;border-color:#6ed49e;border-width:.08em;border-style:solid;border:.08em solid #6ed49e">
            <table width="360" border="0" cellpadding="0" cellspacing="0" align="left" style="margin-bottom:20px;padding-left:15px">
             <tbody>
              <tr>
               <td class="m_116760492459896712col" valign="top">
               <img src="https://ci3.googleusercontent.com/meips/ADKq_Nb8Ig737KppeqTz0rRze8yvqw0l1dDqTZqOeBdt4ZTtMxzT5iTEq-uXU46rpx5FfGvo4i_1_Qv2qpvGiz8ObfaQTcvw6VUezaXldZAGuRCzFy14DA7P3NjIsWIyW-EHRjJ1lXmQGAYOPCBYjql3ZIE-GvaY9pDAzxTGhzgOAqcg=s0-d-e1-ft#https://rukminim1.flixcart.com/www/270/28/promos/07/03/2018/f0e74e39-2481-4e34-b8f6-d2ab80ac15fe.png?q=100" alt="journey" style="margin-bottom:20px" class="CToWUd" data-bit="iit">
               <p style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121;margin-top:0px;margin-bottom:20px"><span style="display:inline-block;width:125px;vertical-align:top"> Delivery </span><span style="font-family:Arial;font-size:12px;font-weight:bold;line-height:1.42;color:#139b3b;display:inline-block;width:220px">
               by  ${d.toLocaleString('default', { weekday: 'short' }) + " " + date + ", " + d.toLocaleString('default', { month: 'short' }) + " " + year}</span> 
               <span style="display:block;font-family:Arial;font-size:10px;color:#878787;margin-top:4px">Please refer to items list for delivery time of individual items </span> </p> <p style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121;margin-bottom:20px;margin-top:0px">
               <span style="display:inline-block;width:125px;min-width:125px;max-width:125px">Amount Paid <strong>$${order.totalPrice}</strong></span>
               </p> <p style="margin-bottom:0px;margin-top:0">
               <a href="${process.env.LIVE_URL}/user/dashboard" style="font-family:Arial; background-color:#ff7f00;color:#fff;padding:0px;border:0px;font-size:14px;display:inline-block;margin-top:0px;border-radius:2px;text-decoration:none;width:160px;text-align:center;line-height:32px;line-height:32px" target="_blank">Manage Your Order</a></p> </td>
              </tr>
             </tbody>
            </table>
            <table width="225" border="0" cellpadding="0" cellspacing="0" align="right" style="margin-bottom:30px;padding-right:15px">
             <tbody>
              <tr>
               <td class="m_116760492459896712col" valign="top" align="left">
                <div style="max-width:220px;padding-top:0px;margin-bottom:20px">
                 <p style="font-family:Arial;font-size:14px;font-weight:bold;line-height:20px;color:#212121;margin-top:0px;margin-bottom:4px">Delivery Address</p>
                 <p style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121;margin-top:0px;margin-bottom:0"> ${getUser.name} <br> <span style="font-family:Arial;font-size:12px;line-height:1.42;color:#212121"> ${getUser.address} </span></p>
                </div><p style="line-height:1.56;margin-top:0;margin-bottom:0"><span style="font-family:Arial;font-size:14px;font-weight:bold;text-align:left;color:#212121;display:block;line-height:20px;margin-bottom:4px">SMS updates sent to</span><span style="font-family:Arial;font-size:12px;color:#212121">${getUser.mobile}</span></p></td>
              </tr>
             </tbody>
            </table> 
            <table width="600" border="0" cellpadding="0" cellspacing="0" align="left" style="padding-left:15px;padding-right:15px">
             <tbody>
              <tr>
               <td class="m_116760492459896712col" valign="top" align="left">
               <p style="font-family:Arial;font-size:12px;text-align:left;color:#212121;padding-top:0px;padding-bottom:0px;line-height:19px;margin-top:0;margin-bottom:0"> You will receive the next update when the items in your order are packed/shipped by the seller. Please note, sellers ship items based on their availability so they can reach you within the shortest possible time possible.</p></td>
              </tr>
             </tbody>
            </table></td>
          </tr>
          <tr> 
           <td></td>
          </tr>
          <tr>
           <td align="left" valign="center" class="m_116760492459896712container" width="100%" style="padding:20px 0px 20px 0px"><span style="font-family:Arial;font-size:14px;font-weight:bold;line-height:1.86;color:#212121">Your ordered products</span></td>
          </tr>
          <tr>
           <td align="left">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:0px">
             <tbody>
              <tr>
               <td height="1" style="background-color:#f0f0f0;font-size:0px;line-height:0px" bgcolor="#f0f0f0"></td>
              </tr>
             </tbody>
            </table></td>
          </tr>
         </tbody>
        </table> 

        <table border="0" width="600" cellpadding="0" cellspacing="0" class="m_116760492459896712container" 
        style="padding-right:20px;padding-left:20px;background-color:#fff;width:642px;max-width:642px;padding-top:0px;padding-bottom:0px">
         <tbody>
          <tr>
           <td>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-bottom:20px;border-bottom:1px solid #f0f0f0"> 
             <tbody>

                ${whole_product.map((product, index) =>
        `
                <tr>
                 <td align="left">
                  <table border="0" cellpadding="0" cellspacing="0" align="left" class="m_116760492459896712col">
                  <tbody>
                  <tr>
                   <td valign="middle" width="120" align="center" class="m_116760492459896712link" style="padding-top: 0px;
                     border: 1px solid #ddd;margin-top: 10px;display: block;"> 
                   <a style="color:#027cd8;text-decoration:none;outline:none;color:#fff;font-size:13px"
                    href="" target="_blank" >
                    <img border="1" src="${product.image}" alt="${product.name}" style="border:none;max-width:125px;max-height:125px" class="CToWUd">
                    </a> 
                    </td>

                   <td valign="top" align="left" style="padding-top:20px;padding-left:15px">

                   <p style="margin-top:0;margin-bottom:7px" class="m_116760492459896712link">
                   <a href="" style="font-family:Arial;font-size:14px;font-weight:normal;
                   font-style:normal;font-stretch:normal;line-height:20px;color:#212121;text-decoration:none!important;word-spacing:0.2em;max-width:360px;
                   display:inline-block;min-width:352px;width:352px" target="_blank" >${product.name}</a>

                   <span style="min-width:100px;font-size:12px;font-weight:bold;padding-right:0px;line-height:20px;text-align:right;display:inline-block;float:right">
                    $${product.salePrice} </span> </p>
                    
                    <p style="line-height:18px;margin-top:0px;margin-bottom:2px;font-family:Arial;font-size:12px;color:#212121">
                    Delivery 
                    <span style="line-height:18px;font-family:Arial;font-size:12px;font-weight:bold;color:#139b3b">
                     by ${d.toLocaleString('default', { weekday: 'short' }) + " " + date + ", " + d.toLocaleString('default', { month: 'short' }) + " " + year} </span></p><p style="line-height:18px;margin-top:0px;margin-bottom:2px;font-family:Arial;
                     font-size:12px;color:#212121"><span style="float:right;font-size:12px;padding-right:5px"> 
                     </span>
                     </p>

                     <p style="line-height:18px;margin-top:0px;margin-bottom:0px;font-family:Arial;font-style:normal;font-size:12px;font-stretch:normal;color:#212121">
                     Qty: ${qty}
                     
                     <span style="float:right;font-size:12px;padding-right:5px"> </span></p>

                    </td>

                  </tr>
                 </tbody>
                </table> 
                </td>
              </tr> 

              `
      )}



         </tbody>
        </table> 

        <table border="0" width="600" cellpadding="0" cellspacing="0" class="m_116760492459896712container" style="padding-right:20px;
        padding-left:20px;background-color:#fff;width:642px;max-width:642px"> 
         <tbody>
          <tr>
           <td align="left">
            <table width="100%" cellspacing="0" cellpadding="0" style="margin:0;max-width:600px;background:#ffffff">
             <tbody>
              <tr style="color:#212121;display:block;margin:0 auto;clear:both">
               <td align="left" valign="top" class="m_116760492459896712container" style="color:#212121;display:block">
                <table width="100%" style="margin-bottom:0px;padding-top:20px;padding-bottom:20px;border-bottom:1px solid #f0f0f0"> 
                 <tbody>
                  <tr>
                   <td width="40%"></td>
                   <td align="right" width="34%"><p style="margin-top:0px;font-family:Arial;font-size:14px;text-align:right;color:#3f3f3f;
                   line-height:14px;padding-top:0px;margin-bottom:0"><span style="color:#212121;text-align:right;font-weight:bold">Amount Paid</span></p></td>
                   <td><p style="margin-top:0px;font-family:Arial;font-size:14px;text-align:right;color:#3f3f3f;padding-top:0px;margin-bottom:0"><span style="padding-right:0px;font-weight:bold">$${order.totalPrice} </span></p></td>
                  </tr> 
                 </tbody>
                </table></td>
              </tr>
             </tbody>
            </table></td>
          </tr>
         </tbody>
        </table>
        </td>
      </tr>
     </tbody>
    </table>
    <br />
    <br />
    </td>
  </tr>
 </tbody>
</table>

    
      `
    }

    mailTranspoter.sendMail(mailOptions, async (err, sendData) => {
      if (err) {
        console.log(err);
        res.status(200).json({ message: "Something is missing" });
        return;
      } else {
        res.status(201).json({message: "Order Successfully Submitted!"});
      }
    })

  } else {
    res.status(200).json("Order not Submitted!");
  }

});

// Get orders list API
router.get('/order-list/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    let itemId = [];
    let orderList = await orderModel.find({ user: userID }).select(['orderItems']);
    for (item of orderList) {
      itemId = itemId.concat(item.orderItems);
    }
    let ordered_product = await OrderItemModel.find({ _id: itemId }).populate('product').select(["product", "quantity"]);
    // let get_Specific_Product = [];
    // let getQty;
    // for (p of ODP) {
    //   get_Specific_Product = get_Specific_Product.concat(p.product);
    //   getQty = p.quantity;
    // }
    res.status(200).json({success:true, ordered_product});
  } catch (err) {
    res.status(200).json({ success: false, message: err });
  }

});


module.exports = router;