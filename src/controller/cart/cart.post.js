const { Cart } = require('../../models/cart.model');
const makeMongoDbServiceCart = require('../../services/mongoDbService')({ model: Cart});
const { Product } = require('../../models/product.model');
const makeMongoDbServiceProduct = require('../../services/mongoDbService')({ model: Product});
const _ = require('lodash');
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Create and Save a new Movie
exports.create = async(req) => {
  try{
    const {productId} = req.body;
    const quantity = Number.parseInt(req.body.quantity);

    let productDetails = await makeMongoDbServiceProduct.getDocumentById(productId);
    if (!productDetails) {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
    
    const ProductData = {
      items: [{
        productId, 
        quantity,
        price: productDetails.price, 
        total: parseInt(productDetails.price * quantity)
      }],
      subTotal: parseInt(productDetails.price * quantity)
    };

    let newProduct = await makeMongoDbServiceCart.createDocument(ProductData);
    newProduct =  newProduct.toJSON();

    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      newProduct
    );
  }
  catch(error) {
    if (error.name === 'ValidationError'){
      return message.inValidParam(
        { 'Content-Type': 'application/json' },
        responseCode.validationError,
        error.message
      );
    }
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};
  