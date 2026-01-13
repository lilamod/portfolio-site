const express = require("express");
const router = express.Router();
const productController = require("../controller/products.controller");

router.post("/create", productController.createNewUser);
router.get("/get", productController.findUser);
router.put("/update", productController.updateUser);
router.delete("/delete", productController.deleteUser);

module.exports = router;