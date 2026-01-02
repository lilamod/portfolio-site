// document.getElementById("paragraph").innerHTML= "New Text"
console.log("JavaScript Connected")
let city = "Delhi";
const country = "India";
console.log("City name is " + city);
console.log("Country name is " + country);

let color = "red";
let age = 30;
let isValid = true;
let value = null;
let x;

console.log("color", color);
console.log("age", age);
console.log("isValid", isValid);
console.log("value", value);
console.log("x", x);

console.log(18 < age);
if(age > 18) {
    console.log("Adult");
}else {
    console.log("Not Adult");
}

const mutiply = (a, b) =>{
    return a * b;
}

console.log(mutiply(2,3))


function displayValues() {
    const value1 = document.getElementById("input1").value;
    const  value2 = document.getElementById("input2").value;

    const operation = document.getElementById("option").value;
    console.log("operation", operation);
    let output = 0;
    if (operation === "add") {
        output = Number(value1) + Number(value2);
    } else if(operation === "subtraction") {
        output = value1 - value2;
    } else if(operation === "multiplication") {
        output = value1 * value2;
    } else if(operation === "division") {
        output = value1 / value2;
    }else {
        output;
    }

    let oddEven = "Odd"
    if (output % 2 === 0) {
        oddEven = "Even"
    }
    document.getElementById("output").innerHTML = "Output: " + output + " number is " + oddEven;
}

function checkNumber() {
    let inputNumber = document.getElementById("input1").value;

    let response ="";
    console.log("inputNumber", inputNumber);
    if (inputNumber > 0) {
        response = "Positive";
    } else if(inputNumber < 0) {
        response = "Negative";
    } else {
        response = "Zero";
    }

    document.getElementById("numbertype").innerHTML = "Number Type is " + response; 
    }

function checkLargerNumber (a,b,c) {
    return Math.max(a,b,c);
}

function tableValue() {
    const value = document.getElementById("input1").value;
    let tableValue = "";
    for (let i = 1; i <= 10; i++ ) {
        tableValue +=  value + " * " + i + " = " + value * i + "<br>" 
    }
    document.getElementById("table").innerHTML = tableValue;
}