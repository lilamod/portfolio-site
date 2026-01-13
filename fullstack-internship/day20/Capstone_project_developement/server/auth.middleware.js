const User = require("./models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async function auth(req, res, next) {
    console.log(req.url.indexOf("/api/auth") )
     if (
        req.path.startsWith("/api/auth") ||         
        req.path === "/api/blog/public/all"          
    ) {
        return next();
    
    } else {

        const token = req.header("Authorization")?.replace("Bearer ", "");
        console.log("token", token);
        if(!token) return res.status(401).json({ msg: "No token available, access denied" });
    
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(verified.id);
            req.user = user;
            next();
        } catch (error) {
            console.log( error.message)
            res.status(400).json({ msg: "Invalid token" || error.message });
        }
    }
}