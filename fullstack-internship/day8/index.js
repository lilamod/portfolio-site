console.log("start");
setTimeout(() => console.log("Hello after 2s"), 2000);
console.log("End");

console.log("One");
setTimeout(()=> console.log("Two"), 1000);
setTimeout(()=> console.log("Three"), 2000);


function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}
function sayBye(){
    console.log("Goodbye!");
}
greet("Rahul", sayBye);

setTimeout(() => {
    console.log("step 1");
    setTimeout(()=>{
        console.log("step 2");
        setTimeout(() => {
            console.log("step 3");
        }, 1000);
    },1000);    
}, 1000);

function doHomework(subject, callback) {
    console.log("Homework done for" + subject);
    callback()
}

function doneHomework(){
    console.log("Home completed at 6 PM");
}
doHomework("Math", doneHomework);

let promise = new Promise((resolve, reject)=> {
    let sucess = true;
    if( sucess) {
        resolve("Task completed");
    }else {
        reject("Task failed");
    }
})
promise
.then(result => console.log(result))
.catch(err => console.log(err));

 

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data received"), 2000);
    });
}

fetchData().then(msg => console.log(msg));

function completeDownload() {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve("Download Complete");
        }, 3000);
    });
}

completeDownload().then(msg => console.log(msg));

function getData(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve("Data loaded");
        }, 2000);
    })
}
async function showData(params) {
    console.log("Fetching...");
    let data = await getData();
    console.log(data);
}

showData();

function getUserData(){
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("User data received")
        }, 2000);
    })
}

async function fetchUser(params) {
    console.log("Fetching users");
    let users = await getUserData();
    console.log(users);
}
fetchUser()

fetchData()
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));
 
  async function showUser() {
    try {
        let user = await getUserData();
        console.log(user);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function loadUsers() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let users = await response.json();
    users.forEach(user => {
        console.log(`${user.name} - ${user.email}`);
    });
}
loadUsers();

async function fetchPost() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await response.json();
    posts.forEach(post => {
        console.log(`${post.title}`)
    })
}

fetchPost();
function simulateDownload(file){
    return new Promise(resolve => {
        const time = Math.floor(Math.random() * 5000)+ 1000;
        setTimeout(()=>{
            resolve("Finshed download" + file);
        },time);
    });
}

async function downloadFile (){
    const file1 = await simulateDownload('file')
}

 function getWeather(city) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                city: city,
                temperature: Math.floor(Math.random() * 30) + 1,
            });
        }, 2000);
    });
}

async function showWeather() {
    const weather = await getWeather("London");
    console.log(`Weather in ${weather.city}: ${weather.temperature}°C, ${weather.condition}`);
}

showWeather();


async function fetchComment(){
    let response = await fetch("https://jsonplaceholder.typicode.com/comments");
    let comments = await response.json();
    // comments.forEach(comment =>{
        const table = document.createElement("table");
        table.style.border = "1px solid black";

        const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Id","Post ID", "Name", "Email", "Comment"];
    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.border = "1px solid black";
        th.style.padding = "8px";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    comments.forEach(comment => {
        const row = document.createElement("tr");

        const values = [
            comment.id,
            comment.postId,
            comment.name,
            comment.email,
            comment.body
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            td.style.border = "1px solid gray";
            td.style.padding = "8px";
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
}

fetchComment();