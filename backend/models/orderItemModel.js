const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
       quantity:{
        type:Number
       },
       product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
       }
});

module.exports = mongoose.model("OrderItem", orderItemSchema)