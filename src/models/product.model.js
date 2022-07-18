/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
  },
  description: {
    type: String,
    maxlength: 255,
    trim: true
  },
  category: {
    type: String,
    maxlength: 50,
    trim: true
  },
  // quantity: {
  //   type: Number,
  //   default: 0
  // },
  price: {
    type: Number,
    default: 0
  }
});

productSchema.method('toJSON', function () {
  const {
    __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = object._id;

  // delete object.password;
  return object;
});

const Product = mongoose.model("Product", productSchema);

exports.productSchema = productSchema;
exports.Product = Product; 