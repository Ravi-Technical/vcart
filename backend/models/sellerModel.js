const mongoose = require('mongoose');
const validateEmail = (email) => {
      var regular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      regular.test(email);
}

const sellerRegister = new mongoose.Schema({
      name: {
            type: String,
            required: "Please enter your name"
      },
      email: {
            type: String,
            unique: true,
            required: "Please enter your email address",
            validate: [validateEmail, "Please enter a valid email address"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      password: {
            type: String,
            required: "Please enter your password"
      },
      mobile: {
            type: Number
      },
      address: {
            type: String,
      },
      token: {
            type: String,
            default: null
      },
      resetPasswordToken: {
            type: String,
            default: null
      }
});

sellerRegister.virtual('id').get(function () {
      return this._id.toHexString();
});

sellerRegister.set('toJSON', { virtuals: true });


module.exports = mongoose.model('SellerRegister', sellerRegister);

