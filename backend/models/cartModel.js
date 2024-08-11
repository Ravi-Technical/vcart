const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
     productId: {
        type:String,
        required:true
     },
     price: {
        type:String,
        required:true
     }
})

cartSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
cartSchema.set('toJSON', {virtuals:true});


module.exports = mongoose.model('Cart', cartSchema);

