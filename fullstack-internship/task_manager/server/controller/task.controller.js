const Task = require("../models/task.model");

const createTask = async (req, res) => {
  try {
     await Task.create({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      author: req.user._id
    });


    res.status(201).json({message: "Task is created successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ author: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findById({_id: req.params.id, author: req.user._id});

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Task.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({message:"Task updated successfully"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById({_id: req.params.id, author: req.user._id});

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndUpdate(req.params.id);

    res.status(200).json({message: "Task deleted"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports ={
    createTask,
    updateTask,
    getMyTasks,
    deleteTask
}