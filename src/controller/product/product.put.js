const { Product } = require('../../models/product.model');
const makeMongoDbServiceProduct = require('../../services/mongoDbService')({ model: Product});
const {uploader} = require('../../utils/image.upload');
const _ = require('lodash');
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Update a User identified by the id in the request
exports.update = async(req) => {
  try{
    const id = req.params.id;
    let result = '';
    const {name, description, category, price} = req.body;
    const isProduct = await makeMongoDbServiceProduct.getSingleDocumentByQuery({name, _id: { $ne: id}});
    if (isProduct) {
      return message.isAssociated(
        { 'Content-Type': 'application/json' },
        responseCode.conflict,
      );
    }

    const files = req.files;
    if (files.length != 0) {
      result = await Promise.all(files.map(a => uploader(a, "product")));
    } else {
      result = await makeMongoDbServiceProduct.getSingleDocumentById(id);
    }
    // Find user and update it with the request body
    const countryData = {
      image: files.length != 0 ? result[0] : result.image, 
      name,
      description,
      category,
      price
    };
    const updateProduct = await makeMongoDbServiceProduct.updateDocument(id, countryData);
    let updatedProduct = undefined;
    if (updateProduct.ok === 1) {
      updatedProduct = await makeMongoDbServiceProduct.getSingleDocumentById(id);
    }
    if(!updatedProduct) {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
    return message.successResponse(
      { 'Content-Type': 'application/json' },
      responseCode.success,
      _.pick(updatedProduct, ["id", "image", "name", "description", "category", "price"])
    );
  }
  catch(error) {
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};