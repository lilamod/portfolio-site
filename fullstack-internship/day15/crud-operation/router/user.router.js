const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");

router.post("/", userController.createNewUser);
router.get("/", userController.findUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/average-age", userController.userAverageAge);

module.exports = router;