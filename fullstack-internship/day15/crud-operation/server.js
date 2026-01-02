const express = require("express");
const app = express();
const User = require("./models/user.model");
const mongoose = require("mongoose");
const ObjectId = require("mongoose")
const router= require("./router/index");

mongoose.connect()
.then(() =>{
    console.log("database connected");
})
.catch(err =>{
    console.log("database not connected", err.message)
})

async function createUser() {
    const newUser = new User({
        name: "Virat",
        email: "virat@gmail.com",
        age: 30
    });

    await newUser.save();
    console.log("User Created:", newUser);
}
createUser();
User.find().then(users => console.log(users));

User.find({
    age: {$gt: 25},
}).then(users => console.log("Adults:", users));

User.findOne({email: "virat@gmail.com"}).then(user => {
    console.log({"User": user});
});

User.updateOne({ email: "virat@gamil.com" }, {$set:{ age: 32 }})
.then(() => console.log("User updated"));

User.updateMany({},{$inc: {age: 1}})
.then(() => console.log("Age is updated successfully"));

User.deleteOne({ _id: ObjectId("") })
.then(() => console.log("User deleted"));

User.deleteMany({ age : {$gt : 60}})
.then(() => console.log("Adults users deleted successfully"));

User.find({age: {$gte: 20 ,$lte: 30}})
.then(users => console.log({"User " : users}));

User.find({$or: [{name: "Aman"}, {name: "Neha"}]})
.then(users => console.log({"Users" : users}));

app.use(express.json());

app.use("/api", router);
app.listen(5000, ()=> {
    console.log("server is running on port 5000");
});
