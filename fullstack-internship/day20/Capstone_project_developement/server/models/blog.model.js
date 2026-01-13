const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    content: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },

    publishedAt: {
      type: String
    },
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
