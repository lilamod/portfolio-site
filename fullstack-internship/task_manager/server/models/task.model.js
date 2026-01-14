const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: 200
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
      index: true
    },

    dueDate: {
      type: Date
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

module.exports = mongoose.model("Task", taskSchema);
