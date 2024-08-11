
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
      },
      productFlag: {
        type:Boolean,
        required:true
      }
})


module.exports = mongoose.model('wishlist', wishlistSchema)