const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routers/index");

mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/mydb")
.then(()=> {
    console.log("database connected successfully")
})
.catch((err) => {
    console.log("error while connecting database", err);
})
app.use(express.json());
app.use("/api", router);

app.listen(5000,()=> {
    console.log("server is running on port 5000");
});