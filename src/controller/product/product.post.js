const { Product } = require('../../models/product.model');
const makeMongoDbServiceProduct = require('../../services/mongoDbService')({ model: Product});
const {uploader} = require('../../utils/image.upload');
const _ = require('lodash');
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Create and Save a new Movie
exports.create = async(req) => {
  try{
    const {name, description, category, price} = req.body;
    // Make sure this account doesn't already exist
    const product = await makeMongoDbServiceProduct.getSingleDocumentByQuery({name});
    if (product) {
      return message.isAssociated(
        { 'Content-Type': 'application/json' },
        responseCode.conflict,
      );
    }
    const files = req.files;
    const result = files.image;
    const ProductData = {
      image: result?.length == 1 ? result[0]['path'] : "",
      name,
      description,
      category, 
      price
    };

    const newProduct = await makeMongoDbServiceProduct.createDocument(ProductData);
    const createdProduct =  newProduct.toJSON();

    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      _.pick(createdProduct, ["id", "image", "name", "description", "category", "price"])
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
  