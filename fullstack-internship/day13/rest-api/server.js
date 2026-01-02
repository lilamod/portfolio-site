const express = require("express");
const app = express();

app.use(express.json());

let users = [
    {id: 1, name: "Dipak", email: "dipak@gmail.com", age: 25},
    {id: 2, name: "Virat", email: "virat@gmail.com", age:17}
];

app.get("/users", (req, res) =>{
    res.json(users)
})

app.post("/users", (req, res) => {
    if (!req.body.name) {
        return res.status(400).json("User name is required");
    }
    if (!req.body.email) {
        return res.status(400).json("Email Address is required");
    }
    if (!req.body.age) {
        return res.status(400).json("User age is required");
    }
   users.push({id: maxSize+1, ...req.body});
   res.status(201).json(users);
});

app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(item => item.id === id);
    if (!user) {
        return res.status(404).json("User does not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json(user);
})

app.delete("/users/:id" ,(req, res) =>{
     const id = parseInt(req.params.id);
    const user = users.find(item => item.id === id);
    if (!user) {
        return res.status(404).json("User does not found");
    }
    const indexToRemove = users.findIndex(item => item.id === id);

    if (indexToRemove > -1) {
        users.splice(indexToRemove, 1); 
    }
    return res.json({msg: "User deleted"});
});

app.get("/users/search", (req, res) => {
   const user = users.find(item =>item.name === req.query.name);
   if(!user) {
    return res.status(404).json("User does not found");
   }
    return res.json(user);
});

app.get("/users/adults", () => {
    const user = users.find(item => item.age >= 18);
    if (!user) {
        return res.status(404).json("Any user is not adults")
    }
    return res.json(user);
});

app.get("/users/emails",  (req, res) => {
    const user= users.map(item => item.email);
    return res.json(user) 
})
app.listen(5000,() => {
    console.log("server is running on port 5000");
});

const sizes = users.map(item => item.id); 
const maxSize = Math.max(...sizes);  