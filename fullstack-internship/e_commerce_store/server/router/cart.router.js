const router = require("express").Router();
const cartController = require("../controller/cart.cotroller");

router.post("/create", cartController.createCart);
router.get("/get", cartController.getCarts);
router.put("/update/:id", cartController.updateCart);
router.delete("/delete/:id", cartController.deleteCart);
router.get("/get/:id", cartController.getCart);

module.exports = router;