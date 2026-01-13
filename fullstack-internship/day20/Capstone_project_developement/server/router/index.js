const express = require("express");
const router = express.Router();
const user = require("./user.router");
const auth = require("./auth.router");
const post = require("./post.router");
const task = require("./task.router");
const blog = require("./blog.router");

router.use("/users", user);
router.use("/auth", auth);
router.use("/post", post);
router.use("/task", task);
router.use("/blog", blog);

module.exports = router;
