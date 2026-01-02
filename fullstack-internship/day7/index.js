
let age = 29;
let pi = 3.14;

let name ="Vinod";
console.log(`Hello,${name}!, Welcome to JavaScript`);

const square = x => x * x;
console.log(square(3));

let arr = [10,11];
let [ a, b] = arr;
console.log("a", a);
console.log("b", b);

let person ={personName :"Rohit", personAge: 30};
let {personName, personAge} = person;
console.log(personName, personAge);

let nums = [1, 2, 3];
let newNums = [...nums, 4, 5];
console.log(newNums);

const addNumber = (a, b) =>{
    return a + b;
}
console.log(addNumber(2,3));

console.log(`My name is ${name} and I am ${age} years old.`);

 

let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]); 
fruits.push("Orange");   
fruits.pop();            
fruits.shift();         
fruits.unshift("Grapes");
fruits.forEach(fruit => console.log(fruit));

const colors =["Red", "Green", "Blue","white", "Brown"];
// console.log(colors[0]);
colors.push("Black");
colors.shift();
for(let color of colors) {
    console.log(color);
};

let student = {
    name: "Rahul",
    age: 22,
    course: "Full Stack"
};
console.log(student.name); 

student.grade = "A";
delete student.age;

let cars = {
    brand: "Tesla",
    start: function(){
        console.log("Car started");
    }
};
cars.start();

let book = {
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    page: 100,
    details: function(){
        console.log(this.title, this.author, this.page);
    }
}
book.details();

let numbers = [1,2,3,4];
let squareofNumber = numbers.map(n => n * n);
console.log(squareofNumber);

let personage =[15,20,25,30];
let adults = personage.filter(age => age >= 18);
console.log(adults);

let totalNums =[1,2,3,4];
let totalOfNums = totalNums.reduce((acc, n) => acc + n,0);
console.log(totalOfNums);

let totalnumbers = [5, 12, 8, 130, 44];
let found = totalnumbers.find(num => num > 10);
console.log(found);

let marks = [50, 70, 40, 90, 30];
let filterMarks = marks.filter(mark => mark >= 50);
console.log(filterMarks);

let bonusMark = marks.map(mark => mark +5);
console.log(bonusMark);

let totalMarks = marks.reduce((acc, n) => acc + n, 0);
console.log(totalMarks);

let students = [
    {name: "Rahul", marks: 85},
    {name: "Aditi", marks: 92},
    {name: "Aman", marks: 76}
];

let toppers = students.filter(s => s.marks > 80);
console.log(toppers);

let employees  = [
    {name :"Vinod", salary: 60000},
    {name :"Mayank", salary: 78000},
    {name: "Manoj", salary: 80000}
]

const incremetSalary = employees.map( item => item.salary + (item.salary * 10 /100));

employees.forEach(ele => { console.log(ele)});


let studentsDetails = [
    {name: "Rahul", age:35, marks:85},
    {name :"Aditi", age:30, marks: 92}
]

studentsDetails.forEach((item) => {
    console.log(`${item.name} - ${item.marks}`)
})
studentsDetails.push({name: "Aman", age: 45, marks: 76})

studentsDetails.forEach((item) => {
    console.log(`${item.name} - ${item.marks}`)
})

const toppersStudenst = studentsDetails.filter(item => item.marks >= 80);

toppersStudenst.forEach((item) => {
    console.log(`${item.name} - ${item.marks}`)
})

const classAverage = studentsDetails.reduce((acc, n) => acc + n.marks,0)/studentsDetails.length;
console.log(classAverage);
const arrayNumber = [1,2,3,4,5,6];

const evenNumber = arrayNumber.filter(item => item % 2 === 0);
console.log(evenNumber);

let laptop = {
    brand: "Dell",
    ram:"512GB",
    price: "1,00,000",
    details: function(){
        console.log(this.brand, this.ram, this.price);
    }
};
laptop.details();

const highestMark = function(marks){
    return Math.max(...marks);
}
const lowestMark = function(marks) {
    return Math.min(...marks);
}

const averageMark = function(marks) {
    return marks.reduce((acc, n)=>  acc + n, 0)/ marks.length;
}
console.log(highestMark([1,2,3,4,5,6,7]));
console.log(lowestMark([1,2,3,4,5,6,7]));
console.log(averageMark([1,2,3,4,5,6,7]));

function addStudent(studentArray){
    students.push(...studentArray);
};

addStudent([{name:"Vivek", marks:90}])

console.log(students)