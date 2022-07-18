/* eslint-disable no-unused-vars */
const _ = require('lodash');
const { Cart } = require('../../models/cart.model');
const makeMongoDbServiceCart = require('../../services/mongoDbService')({ model: Cart});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Retrieve and return all users from the database.
exports.findAll = async (req) => {
  try{
    let meta = {};
    const select = ["id", "items", "subTotal"];
    const populate = [{path: 'items.productId', select: 'image name price category total'}]
    let getProduct = await makeMongoDbServiceCart.getSingleDocumentByQueryPopulate({}, select, populate);
    
    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      getProduct || {},
      meta
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
      error.message
    );
  }
};