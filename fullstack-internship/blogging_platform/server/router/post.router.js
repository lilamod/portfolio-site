const router = require("express").Router();
const postController = require("../controller/post.controller");

router.post("/create", postController.createPost);
router.get("/get", postController.getPost);
router.get("/get/:id", postController.getpostById);
router.put("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);

module.exports = router;