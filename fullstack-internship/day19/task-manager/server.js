const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Task = require("./models/Task");
const User = require("./models/user.model");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

    const users = [
        {name :" Vipul"},
        {name: "Rohit"},
        {name : "Mayank"},
        {name: "manoj"}
    ]
     User.insertMany(users);

app.get("/tasks", async (req, res) => {
    const { userId } = req.query;

    let filter = {};
    if (userId) {
        filter.userId = userId;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
