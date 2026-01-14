const Post = require("../models/post.model");

const createPost = async(req, res) =>{
    console.log("user", req.user)
    const isTitleExist = await Post.findOne({title: req.body.title});
    if(isTitleExist) {
        return res.status(400).json({message: "Post title is exist"});
    }
    req.body.author = req.user._id;
    const newPost = new Post({...req.body});
    await newPost.save()
    .then(()=>{
        return res.status(201).json({message: "Post is successfully created"});
    }) 
    .catch(err => {
        return res.status(400).json({message: err.message});
    })
}

const getPost = async(req, res)=>{
    const posts = await Post.find({author: req.user._id})
    if(posts.length > 0) {
        return res.status(200).json(posts);
    }else {
        return res.status(200).json([]);
    }
}
const getpostById = async(req, res) => {
    const post = await Post.findById({_id: req.params.id, author: req.user._id});
    if(post) {
        return res.status(200).json(post);
    }else {
        return res.status(404).json({message: "Post does not found"});
    }
}

const updatePost = async(req, res) =>{
    const post = await Post.findById(req.params.id);
    if(post) {
        await Post.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({message: "Post is updated successfully"});
    }else {
        return res.status(404).json({message: "Post does not found"});
    }
}

const deletePost = async(req, res) =>{
    const post = await Post.findById(req.params.id);
    if(post) {
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Post is deleted successfully"});
    }else {
        return res.status(404).json({message: "Post does not found"});
    }
}

module.exports = {
    createPost,
    getPost,
    getpostById,
    updatePost,
    deletePost
}