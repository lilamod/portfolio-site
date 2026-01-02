const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://lilamod6547_db_user:OEEzEpi9xZNTLqt1@cluster0.lx6ixkp.mongodb.net/text")
.then(() => {
    console.log("Connected");
})
.catch(err => {
    console.log("not connected", err.message)
});

const tokenBlacklist = [];

async function auth(req, res, next){
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token) {
        return res.status(401).json({msg: "No token available, access denied"});
    }
    const unusedToken = tokenBlacklist.find(item => item === token);
    if(unusedToken) {
        return res.status(400).json({msg: "Please login again"});
    }
    try {
        const verified = jwt.verify(token, "secretkey");
        const user = await User.findById(verified.id)
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({msg:"Invalid token"});
    }
}

function authorization(allowedRole){
    return (req, res, next) =>{
        const userRole = req.user.role
        if(!allowedRole.includes(userRole)){
            return res.status(403).send("You do not have permission to access this router");
        }
        next();
    }
}

app.use(express.json());

app.post("/signup", async(req, res) => {
    try {
        const {email, name, password, role} = req.body;
        const duplicateEmail = await User.findOne({email});
        if(duplicateEmail) {
            return res.status(400).json({email:"User email address is already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, role, password:hashedPassword});
        await newUser.save();
        res.status(200).json({msg: "User created successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ msg: "Login successful", token });
});

app.get("/profile", auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

app.get("/admin",auth,  authorization(['admin']),auth, async(req, res) =>{
    const user = await User.find();
    res.json(user);
})

app.post("/logout", auth, async(req, res) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token) {
        return res.status(401).json({msg: "No token available, access denied"});
    }
     tokenBlacklist.push(token);
     res.status(200).json({msg: "Logout successfully"})
})

app.listen(4000,()=>{
    console.log("server is running on port 4000");
})