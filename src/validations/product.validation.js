const { body, param } = require('express-validator');
const { Product } = require('../models/product.model');
const makeMongoDbServiceProduct = require('../services/mongoDbService')({ model: Product});

module.exports = {
  
  create: [
    body('name', 'Name can not be empty').exists({checkFalsy: true}).isString(),
    body('category', 'Category can not be empty').exists({checkFalsy: true}).isString(),
    body('description', 'Description must less then 225 charecter').isLength({ max: 255 }),
    body('price', 'Description must less then 225 charecter').isNumeric(),
    // body('quantity', 'quantity must be more then zero').isNumeric({ min: 1 }),
  ],

  update: [
    param('id', 'User id is required').exists({checkFalsy: true}),
    body('name', 'Name can not be empty').exists({checkFalsy: true}).isString(),
    body('category', 'Category can not be empty').exists({checkFalsy: true}).isString(),
    body('description', 'Description must less then 225 charecter').isLength({ max: 255 }),
    body('price', 'Description must less then 225 charecter').isNumeric(),
    // body('quantity', 'quantity must be more then zero').isNumeric({ min: 1 }),
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
