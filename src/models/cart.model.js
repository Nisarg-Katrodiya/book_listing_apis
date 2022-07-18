/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const {Product} = require('./product.model');

const ItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const cartSchema = new mongoose.Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})

cartSchema.method('toJSON', function () {
  const {
    __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = object._id;
  
  // delete object.password;
  return object;
});

const Cart = mongoose.model('Cart', cartSchema);

exports.cartSchema = cartSchema;
exports.Cart = Cart; 