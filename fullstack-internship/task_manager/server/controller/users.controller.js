const User = require("../models/user.model");


const createNewUser = async(req, res) =>{
    if(!req.body.name){
        return res.status(400).json("User name is required");
    }
    if(!req.body.email) {
        return res.status(400).json("Email address is required");
    }
    
    const newUser = new User({...req.body});
    await newUser.save()
    .then(() =>{
        return res.status(201).json("User is created successfully");
    })
    .catch((err) => {
        return res.status(400).json("User is not created", err.message);
    });
 }

 const findUser = async(req, res) => {
    const users = await User.find();
    if(users.length > 0) {
        return res.status(200).json(users);
    }
    return res.status(200).json([]);
 }

 const updateUser = async(req, res) =>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json("User does not found");
    }
    await User.updateOne({_id: req.params.id} ,req.body)
    .then(() => {
        return res.status(200).json("User detail updated successfully");
    })
    .catch(err =>{
        return res.status(400).json("User detail has been nopt updated", err.message);
    });
 };

 const deleteUser = async(req, res) =>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json("User does not found");
    }
    await User.findByIdAndDelete(req.params.id)
    .then(()=>{
        return res.status(200).json("User deleted successfully");
    })
    .catch(err => {
        return res.status(400).json(err.message);
    });
 }

 const getUserById = async(req,res) =>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json("User does not found");
    }
    return res.status(200).json(user);
 }
 


 module.exports ={
    createNewUser, findUser, updateUser, deleteUser, getUserById
 }