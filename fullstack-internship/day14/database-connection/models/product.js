const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true
    },
},{
    versionKey: false,
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);