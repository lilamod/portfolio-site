//  title, content, author, date.

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: [true,  "Post content is required"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema);