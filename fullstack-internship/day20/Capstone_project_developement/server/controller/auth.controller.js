const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

const signin = async(req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ msg: "Login successful", token });
}

const signup = async(req, res) =>{
    try {
        const { email, name, password } = req.body;
        const duplicateEmail = await User.findOne({ email });
        if(duplicateEmail) return res.status(400).json({ email: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    signin,
    signup
}