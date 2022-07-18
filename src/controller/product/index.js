/* eslint-disable no-unused-vars */
const sendResponse = require('../../helpers/sendResponse');
const productGet = require('./product.get');
const productCreate = require('./product.post');
const productUpdate = require('./product.put');
const productDelete = require('./product.delete');

exports.create = (req,res,next) => {
  productCreate.create(req)
  .then((result)=>{
      sendResponse(res,result);
  })
  .catch((e) => {
      sendResponse(res,e);
  });
};

exports.findAll = (req, res, next) => {
    productGet.findAll(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.findById = (req, res, next) => {
  productGet.findById(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.update = (req, res, next) => {
  productUpdate.update(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.delete = (req, res, next) => {
  productDelete.delete(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};
