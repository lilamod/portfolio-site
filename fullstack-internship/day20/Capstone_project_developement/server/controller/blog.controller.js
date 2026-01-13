const Blog = require("../models/blog.model");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  try {
    const { title, content, status } = req.body;
    await Blog.create({
      title,
      content,
      status,
      author: req.user._id,
      publishedAt: status === "published" ? new Date() : null
    });

    res.status(201).json({message: "Blog is created successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Fetch a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(id).populate("author", "name email");

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.status === "draft" && (!req.user || blog.author._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (blog.status === "published") {
      blog.views += 1;
      await blog.save();
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all public blogs
const getPublicBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" }).populate("author", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


 const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById( req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }


    if (
      req.body.status === "published" &&
      blog.status !== "published"
    ) {
      req.body.publishedAt = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      blog: updatedBlog
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById( req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports ={
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getBlogById,
    getPublicBlogs,
    getMyBlogs
}
