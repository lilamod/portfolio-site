const express = require("express");
const router = express.Router();
const user = require("./user.router");
const auth = require("./auth.router");
const post = require("./post.router");

router.use("/users", user);
router.use("/auth", auth);
router.use("/post", post);

module.exports = router;
