const express = require("express");
const router = express.Router();
const user = require("./user.router");
const auth = require("./auth.router");
const task = require("./task.router");

router.use("/users", user);
router.use("/auth", auth);
router.use("/task", task);

module.exports = router;
