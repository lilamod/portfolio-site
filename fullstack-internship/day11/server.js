const http = require("http");

const moment = require("moment");
const date = Date.now();
const server = http.createServer((req, res)=>{ 

    if (req.url === "/about") {
        res.writeHead(200, {"content-type" : "text/plain"});
        res.end("About Page");
    } else if (req.url === "/contact") {
        res.writeHead(200, {"content-type" : "text/plain"});
        res.end("Contact Page");
    } else if (req.url === "/time") {
        res.end(moment(date).format("DD/MM/YYYY, h:mm:ss a"))
    } else if (req.url === "/api") {
        res.writeHead(200, {"content-type": "application/json"})
        const responseData = {
            message: "This is the API Page",
            currentDate: moment(date).format("DD/MM/YYYY, h:mm:ss a"),
        };
        res.end(JSON.stringify(responseData));
    } else {
        res.writeHead(200, {"content-type": "text/plain"});
        res.end("Welcome to My First Node.js Server");
    }
})



console.log(moment(date).format("DD/MM/YYYY, h:mm:ss a"))


server.listen(3000, ()=>{
    console.log("server is running on port 3000")
})