const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})
app.use(express.json());
// app.use(express.static("public"));


app.get("/about", (req, res) => {
    res.send("About your project");
});

app.get("/contact", (req, res) => {
    res.send("Contact info");
});

const userDetails = [
  {"id": 1, "name": "Mehul"},
  {"id": 2, "name": "Dipak"}
]

app.get("/api/users", (req, res) => {
    res.json(userDetails);
});

app.get("/", (req,res) => {
    console.log("calling")
    res.send("Welcome to this express framework");
});

app.get("/weather/:city", (req, res) => {
    res.json({
        city: req.params.city,
        temp: "30°C"
    });
});
app.post("/api/users", (req, res) => {
    const lastId = largest(userDetails);
    userDetails.push({id: lastId + 1, name: req.body.name});
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})

function largest(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++)
        if (arr[i] > max)
            max = arr[i];

    return max;
}

