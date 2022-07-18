/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const validate = require('../validations/handler');
const rules = require('../validations/product.validation');
const product = require('../controller/product');
// const { auth } = require('../middleware/auth.mdl');

const {upload} = require('../utils/image.upload');

// router.use(auth);

// Create a new product
router.post('/', upload, validate(rules.create), product.create);

// Retrieve all product
router.get('/list', product.findAll);

// Retrieve a single product with id
router.get('/:id', validate(rules.productgetById), product.findById);

// Update a product with id
router.put('/:id', upload, validate(rules.update), product.update);

// Delete a product with id
router.delete('/:id', validate(rules.productgetById), product.delete);

module.exports = router;