function greet() {
    console.log("Hello, Welcome to JavaScript!");
}

greet()

function sayHello(){
    console.log("Hello Student");
}

sayHello();
sayHello();
sayHello();

function greetWithName(name){
    console.log("Hello " + name);
}

greetWithName("Vivek");
greetWithName("Manoj");


function add (a,b) {
    return a + b;
}

console.log(add(2, 3));

function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(3));

function square(n){
    return n * n;
}
console.log(square(3));

function declarationgreet(){
    console.log("Hello");
}

const expressionFunction = function() {
    console.log("Hi there");
}

const arrowFunction =() => {
    console.log("Hey!");
}

declarationgreet();
expressionFunction();
arrowFunction();

const squarefuntion = x => x * x;
console.log(squarefuntion(2))


function isEvenDeclaration(num){
    if(num % 2 === 0){
        return true;
    }
    return false
}

const isEvenExpression = function(num){
    if(num % 2 === 0) {
        return true;
    }
    return false;
}

const isEvenArrow = num => {
    if(num % 2 === 0) {
        return true;
    }
    return false;
}

isEvenDeclaration(2);
isEvenExpression(2);
isEvenArrow(2);

let name = "Rahul";
function showName (){
    console.log(name);
}
showName();

function test(){
    let x = 10; 
    console.log(x);
}
// console.log(x);

test();

// if(true) {
//     let a = 10; 
//     const b = 20;
// }
// console.log(a);
// console.log(b);

// function variableAccess (){
//     let y = 10;
//     console.log(y);
// }
// console.log(y);

// if(true) {
//     var c = 10;
// }
// console.log(c);


setTimeout(function (){
    console.log("This run after 2 seconds");
},2000)

function processUserInput(callback){
    let name = "vipul";
    callback(name);
}

processUserInput(function(n) {
    console.log("Hello " + n);
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}
function calculate (a, b, callback) {
    return callback(a, b);
}

console.log(calculate(10, 5, add));
console.log(calculate(4, 2, subtract));
console.log(calculate(5, 6, multiply));

let tasks =[];

function addTask (task) {
    tasks.push(task);
}

function showTasks(){
    for (let [index, task] of tasks.entries()){
        console.log(`${index + 1}.` + " "+ task)
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
}

addTask("Learn JavaScript");
addTask("Practice CSS");
showTasks();
deleteTask(1);
showTasks();


function factorial (n) {
    if(n < 0) {
        return "factorial is negative"
    }else if(n === 0 ||  n === 1){
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(5));

const reverseString = (str) => {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

console.log(reverseString("world"));

const isPalindrome = function(str) {
    const lowerCaseString = str.toLowerCase().replace("/[^a-z0-9]/g","");
    const reversedString = lowerCaseString.split(""). reverse().join("");
    return reversedString === lowerCaseString;
}

console.log(isPalindrome("hello"));
console.log(isPalindrome("racecar"));


let tasksMarks = [];

function addTaskMark(task) {
    tasksMarks.push({name: task, completed: false});
}

function showTaskMark(){
     tasksMarks.forEach((task, index) => {
    const status = task.completed ? "Completed" : "Not completed";
    console.log(`${index}: ${task.name} — ${status}`);
  });
}

function deleteTaskMarks(index) {
    tasksMarks.splice(index, 1)
}

function completeTaskMarks(index){
    tasksMarks[index].completed = true;
}

addTaskMark("Do homework");
addTaskMark("Read a book");
showTaskMark();

completeTaskMarks(1);
showTaskMark();
deleteTaskMarks(0);
showTaskMark();

