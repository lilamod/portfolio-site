const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    age: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: false
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);