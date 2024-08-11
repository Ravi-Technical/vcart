const mongose = require("mongoose");


/************** Product Schema ****************/
const productSchema = new mongose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String
  },
  longDescription: {
    type: String
  },
  image: {
    type: String,
    default: "placeholder.jpg",
  },
  images: [
    {
      type: String,
      default: "",
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  size: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  countInStock: {
    type: Number,
    min: 0,
    max:2000,
  },
  rating: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type:Number,
    required:true,
    default:0
  },
  
});

// Make _id into developer frindly like id
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", { virtuals: true });

module.exports = mongose.model("products", productSchema); // Model is return an object by ES6 feature
 

