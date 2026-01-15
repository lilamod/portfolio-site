const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        index: true,
    },
    pinned: { 
        type: Boolean,
         default: false 
        },
    color: { 
        type: String, 
        default: "#242529" 
    },
})

module.exports = mongoose.model("Note", NoteSchema);