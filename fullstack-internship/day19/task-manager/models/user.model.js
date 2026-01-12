const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "User name is required"],
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
