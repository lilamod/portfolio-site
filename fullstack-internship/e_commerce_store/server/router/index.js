const express = require("express");
const router = express.Router();
const user = require("./user.router");
const auth = require("./auth.router");
const product = require("./product.router");
const cart = require("./cart.router");
const order = require("./order.router");

router.use("/users", user);
router.use("/auth", auth);
router.use("/product", product);
router.use("/cart", cart);
router.use("/order", order);

module.exports = router;
