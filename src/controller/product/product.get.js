/* eslint-disable no-unused-vars */
const _ = require('lodash');
const { Product } = require('../../models/product.model');
const makeMongoDbServiceProduct = require('../../services/mongoDbService')({ model: Product});
const message = require('../../utils/messages');
const responseCode = require('../../utils/responseCode');

// Retrieve and return all users from the database.
exports.findAll = async (req) => {
  try{
    let meta = {};
    const { pageNumber, pageSize } = req.query;
    const query = {};
    const select = ["id", "image", "name", "description", "category", "price"];
    let getProduct = {};
    if (pageNumber && pageSize) {
      getProduct = await makeMongoDbServiceProduct.getDocumentByQueryPopulate(query, select, [], pageNumber, pageSize);
      const productCount = await makeMongoDbServiceProduct.getCountDocumentByQuery({});
      meta = {
        pageNumber,
        pageSize,
        totalCount: productCount,
        prevPage: parseInt(pageNumber) === 1 ? false : true,
        nextPage:
          parseInt(productCount) / parseInt(pageSize) <=
          parseInt(pageNumber)
            ? false
            : true,
        totalPages: Math.ceil(
          parseInt(productCount) / parseInt(pageSize)
        ),
      };
    } else {
      getProduct = await makeMongoDbServiceProduct.getDocumentByQueryPopulate(query, select, []);
      meta.totalCount = getProduct.length;
    }
    if (getProduct) {
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        getProduct,
        meta
      );
    } else {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
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

// Find by email
exports.findById = async (req) => {
  try{
    const id = req.params.id;
    const select = ["id", "image", "name", "description", "rating", "totalreview"];
    const getProduct = await makeMongoDbServiceProduct.getSingleDocumentById(id, select);
    if (getProduct) {
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        getProduct
      );
    } else {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
  }
  catch(error) {
    if(error.kind === 'ObjectId') {
      return message.recordNotFound(
        { 'Content-Type': 'application/json' },
        responseCode.notFound,
      );
    }
    return message.failureResponse(
      { 'Content-Type': 'application/json' },
      responseCode.internalServerError,
    );
  }
};
