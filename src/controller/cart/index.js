/* eslint-disable no-unused-vars */
const sendResponse = require('../../helpers/sendResponse');
const cartGet = require('./cart.get');
const cartCreate = require('./cart.post');
const cartUpdate = require('./cart.put');
const cartDelete = require('./cart.delete');

exports.create = (req,res,next) => {
  cartCreate.create(req)
  .then((result)=>{
      sendResponse(res,result);
  })
  .catch((e) => {
      sendResponse(res,e);
  });
};

exports.findAll = (req, res, next) => {
    cartGet.findAll(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.update = (req, res, next) => {
  cartUpdate.update(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};

exports.delete = (req, res, next) => {
  cartDelete.delete(req)
    .then((result)=>{
        sendResponse(res,result);
    })
    .catch((e) => {
        sendResponse(res,e);
    });
};
