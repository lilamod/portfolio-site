const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "User name is required"],
    },
    email :{
        type: String,
        required: [true, "Email address is required"],
        match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    role:{
        type: String,
        default:"user"
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
