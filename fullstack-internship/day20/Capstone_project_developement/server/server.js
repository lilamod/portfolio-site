const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const router= require("./router/index");
const  auth  = require("./auth.middleware");
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(auth);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

mongoose.connect(MONGO_URI)
.then(() =>{
    console.log("database connected");
})
.catch(err =>{
    console.log("database not connected", err.message)
})


app.use("/api", router);
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
});
