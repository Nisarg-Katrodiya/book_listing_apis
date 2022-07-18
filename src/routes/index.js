const express = require('express');
const router = express.Router();
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");

// product
router.use("/product", productRoutes);

// cart
router.use("/cart", cartRoutes);

module.exports = router;