const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
         type: String,
          required: [true,"Username is required"],
          minlength: 3,
         },
    email: {
         type: String, 
         required: [true, "Email is required"], 
         unique: true,
         match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Please fill a valid email address']
        },
    age: { 
        type: Number, 
        min: 1,
        max: 100
    },
    role: {
        type: String,
        default:"user",
        required: [true, "Role is required"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;