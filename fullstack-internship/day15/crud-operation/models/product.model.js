const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
        minlength: 3,
        maxlength:10
    },
    price: {
        type: String,
        required: [true, "Product Price is required"],
        minlength: 2,
        maxlength: 100
    },
    stock: {
        type: Number,
        required: [true, "Product Stock is required"],
        minlength: 2
    }
})