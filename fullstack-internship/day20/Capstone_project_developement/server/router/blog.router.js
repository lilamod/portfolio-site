const express = require("express");
const router = express.Router();

const {
  createBlog,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getPublicBlogs
} = require("../controller/blog.controller");


router.post("/",  createBlog);
router.get("/my", getMyBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

router.post("/public", getPublicBlogs);

http://localhost:3000/api/blog/public

module.exports = router;
