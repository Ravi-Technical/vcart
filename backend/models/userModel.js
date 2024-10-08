const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    pincode:{
      type:Number,
      required:true
    },
    city:{
     type:String,
     required:true
    },
    state:{
     type:String,
     required:true,
     default:null
    },
    alternatePhone:{
        type:Number,
        default:null
    },
    email: {
        type:String,
        required:true,
    },
    password:{
        type:String,
    },
    mobile: {
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    status : {
        type:Boolean,
        default:true
    },
    token: {
        type:String,
        default:null
    },
    resetPasswordToken: {
        type: String,
        default: null
  }
}) 

userSchema.virtual('id').get(function(){
    this._id.toHexString();
})
userSchema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('User', userSchema);