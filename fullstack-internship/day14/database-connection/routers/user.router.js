const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");

router.post("/create", userController.createNewUser);
router.get("/get", userController.findUser);
router.put("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);
router.get("/active", userController.activeUser);
router.get("age/:min", userController.userOlderAge);

module.exports = router;