const mongoose = require('mongoose');

const Brand = new mongoose.Schema({
    brandName:{
        type:String,
        required:true
    },
    icon:{
        type:String
    },
    color:{
        type:String
    }
})

Brand.virtual('id').get(function(){
    return this._id.toHexString();
})
Brand.set("toJSON", {virtuals:true});

module.exports = mongoose.model('Brands', Brand);

