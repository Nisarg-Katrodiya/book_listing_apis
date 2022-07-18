/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const validate = require('../validations/handler');
const rules = require('../validations/cart.validation');
const cart = require('../controller/cart');

// Create a new cart
router.post('/', validate(rules.create), cart.create);

// Retrieve all cart
router.get('/', cart.findAll);

// Update a cart with id
router.put('/', validate(rules.create), cart.update);

// Delete a cart with id
router.delete('/empty-cart', cart.delete);

module.exports = router;