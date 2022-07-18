const { Cart } = require('../../models/cart.model');
const makeMongoDbServiceCart = require('../../services/mongoDbService')({ model: Cart});
const { Product } = require('../../models/product.model');
const makeMongoDbServiceProduct = require('../../services/mongoDbService')({ model: Product});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

exports.update = async(req) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await makeMongoDbServiceCart.getSingleDocumentByQuery();
    let productDetails = await makeMongoDbServiceProduct.getDocumentById(productId);
    if (!productDetails) {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
    
    if (cart) {
      const indexFound = cart.items.findIndex(item => item.productId == productId);
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
            cart.subTotal = 0;
        } else {
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
      }
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
      }
      else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity)
        })
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
      }
      else {
        return message.badRequest(
          { 'Content-Type': 'application/json' },
          responseCode.badRequest,
        );
      }
      cart = cart.toJSON();
      await makeMongoDbServiceCart.updateDocument(cart.id, cart);
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        cart
      );
    }
    else {
      const cartData = {
        items: [{
          productId: productId,
          quantity: quantity,
          total: parseInt(productDetails.price * quantity),
          price: productDetails.price
        }],
        subTotal: parseInt(productDetails.price * quantity)
      }
      let newProduct = await makeMongoDbServiceCart.createDocument(cartData);
      newProduct =  newProduct.toJSON();
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        newProduct
      );
    }
  } catch(error) {
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};

