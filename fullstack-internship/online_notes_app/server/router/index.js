const express = require("express");
const router = express.Router();
const user = require("./user.router");
const auth = require("./auth.router");
const note = require("./note.router");

router.use("/users", user);
router.use("/auth", auth);
router.use("/note", note);

module.exports = router;
