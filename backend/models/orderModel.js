const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
       orderItems : [{
           type:mongoose.Schema.Types.ObjectId,
           ref:'OrderItem',
        }],
        pincode:{
            type:Number
        },
        address: {
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        phone:{
            type:Number
        },
        status:{
            type:String,
            default:"Pending"
        },
        totalPrice:{
            type:Number
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        orderDate:{
            type:Date,
            default:Date.now
        },
        paymentMode:{
            type:String,
            default:"COD"
        },
        alternatePhone:{
            type:Number
        },
        orderId : {
            type:String,
            default:"OD" + Date.now() + Math.round(Math.random() * 1000)
          }
});

// orderSchema.virtual('orderId').get(function(){
//     return this._id.toHexString();
// })
// orderSchema.set("toJSON", {virtuals:true})

module.exports = mongoose.model('Order', orderSchema );
