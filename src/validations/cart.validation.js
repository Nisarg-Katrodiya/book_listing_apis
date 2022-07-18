const { body, param } = require('express-validator');
const { Product } = require('../models/product.model');
const makeMongoDbServiceProduct = require('../services/mongoDbService')({ model: Product});

module.exports = {
  
  create: [
    body('productId', 'Product not found with this id').exists({ checkFalsy: true }).custom(value => {
      return makeMongoDbServiceProduct.getSingleDocumentById(value)
        .then(product => {
          if (!product) {
            return Promise.reject('Product not found!');
          }
        });
    }),
    body('quantity', 'quantity must be more then zero').isNumeric({ min: 1 }),
  ],

  productgetById: [
    param('id', 'Product not found with this id').exists({ checkFalsy: true }).custom(value => {
      return makeMongoDbServiceProduct.getSingleDocumentById(value)
        .then(product => {
          if (!product) {
            return Promise.reject('Product not found!');
          }
        });
    })
  ],
};
