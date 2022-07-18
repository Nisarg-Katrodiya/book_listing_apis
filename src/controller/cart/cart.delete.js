const { Cart } = require('../../models/cart.model');
const makeMongoDbServiceCart = require('../../services/mongoDbService')({ model: Cart});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Delete a User with the specified id in the request
exports.delete = async(req) => {
  try{
    let cart = await makeMongoDbServiceCart.getSingleDocumentByQuery();
    cart.items = [];
    cart.subTotal = 0;
    cart = cart.toJSON();
    await makeMongoDbServiceCart.updateDocument(cart.id, cart);
    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      cart
    );
  } catch(error) {
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};