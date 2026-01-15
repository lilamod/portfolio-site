const router = require("express").Router();
const orderController = require("../controller/order.controller");

router.post("/create", orderController.createOrder);
router.get("/get", orderController.getOrders);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.get("/get/:id", orderController.getOrder);

module.exports = router;