const { Product } = require('../../models/product.model');
const makeMongoDbServiceProduct = require('../../services/mongoDbService')({ model: Product});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Delete a User with the specified id in the request
exports.delete = async(req) => {
  try{
    const id = req.params.id;
    const isProduct = await makeMongoDbServiceProduct.deleteDocument(id);
    if(isProduct) {
      return message.requestValidated(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        "Product has been deleted successfully"
      );
    } else {
      return message.failedSoftDelete(
        { 'Content-Type': 'application/json' },
        responseCode.conflict,
      );
    }
  } catch(error) {
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};