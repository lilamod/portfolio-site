let age = 20;
if (age >= 18) {
    console.log("you are an adult");
} else {
    console.log("You are not adult");
}

if (age > 0) {
    console.log("Number is Positive");
} else {
    console.log("Number is Negative");
}

let marks = 65;
if (marks >= 50) {
    console.log("pass");
} else {
    console.log("Fail");
}

let percentage = 85;
if ( percentage >= 90) {
    console.log("Grade A");
}else if (percentage >= 75) {
    console.log("Grade B");
}else if (percentage >= 50) {
    console.log("Fail");
}

let temperature = 14;

if (temperature > 30) {
    console.log("Hot");
}else if (temperature > 15  && temperature < 30) {
    console.log("Warm");
}else {
    console.log("Cold");
}

let day = 3;

 
switch(day) {
    case 1:
        console.log("January");
        break;
    case 2:
        console.log("February");
        break;
    case 3:
        console.log("March");
        break;
    case 4:
        console.log("April");
        break;
    case 5:
        console.log("May");
        break;
    case 6:
        console.log("June");
        break;
    case 7:
        console.log("July");
        break;
    case 8:
        console.log("August");
        break;
    case 9:
        console.log("September");
        break;
    case 10:
        console.log("October");
        break;
    case 11:
        console.log("November");
        break;
    case 12:
        console.log("December");
        break;
}

for(let i = 1; i <= 5; i++ ) {
    console.log("i", i)
}


let i = 1;
while (i <= 5) {
    console.log("Count: " + i);
    i++;
}

do {
    console.log("Value: " + i);
    i++;
} while (i <= 5);


let colors = ["Red", "Blue", "Brown"];
for (let color of colors) {
    console.log(color);
}

for(let i = 1; i <= 10; i++) {
    console.log(i);
}

let j = 1;
while (j <= 20 ) {
    if(j % 2 === 0) {
        console.log("Value of j " + j);
    }
    j++;
}


let names = ["Vipul", "Rohit", "Vinod"];

for(let name of names) {
    console.log("name is", name)
}

for(let i = 0; i <= 3; i++) {
    for(let j = 0; j <= 3; j++) {
        console.log(i,j);
    }
}

for(let i = 0; i <= 5; i++) {
    if(i === 3) break;
    console.log(i);
}

for(let i = 0; i <= 5; i++){
    if(i === 3 ) continue;
    console.log(i);
}

for(let i = 1; i <= 10; i++){
    if(i === 5) continue;
    console.log(i);
}

const ps = require("prompt-sync");
const prompt = ps();

let secret = Math.floor(Math.random() * 10) + 1;
let guess;
do {
    guess = prompt("Guess a number between 1 and 10.");
    if (guess == secret) {
        console.log("Correct! You win 🎉");
        break;
    } else if (guess > secret) {
        console.log("Too high! Try again");
    } else {
        console.log("Too low! Try again")
    }
} while(guess !== secret);

const multiplyValue  = prompt("Enter a value for multiply value: ");
for( let i = 1; i <= 10; i++) {
    console.log(multiplyValue + " * " + i + " = " + multiplyValue * i);
}

function isPrime(num) {
    if (num <= 1) {
        return false;
    }

    if (num === 2) {
        return true;
    }

    if (num % 2 === 0) {
        return false;
    }

    const limit = Math.floor(Math.sqrt(num));
    for (let i = 3; i <= limit; i += 2) {
        if(num % i === 0) {
            return false;
        }
    }
    return true;
}


console.log(isPrime(7));  
console.log(isPrime(10)); 
console.log(isPrime(23)); 
console.log(isPrime(1));  
console.log(isPrime(9));  
console.log(isPrime(2)); 


let total = 0
for (let i = 1; i <= 100; i++){
    total += i;
}

console.log("total", total);

const secretNumber = Math.floor(Math.random() * 10) + 1;

let guessNumber;
let attempt = 1;
let maxAttempts = 5;

do {
    guessNumber = Number(prompt(`Guess a number between 1 and 10 (Attempt ${attempt}/${maxAttempts}):`));

    if (guessNumber === secretNumber) {
        console.log("Correct! You win 🎉");
        break;
    } else if (guessNumber > secretNumber) {
        console.log("Too high! Try again.");
    } else {
        console.log("Too low! Try again.");
    }

    attempt++;

    if (attempt > maxAttempts) {
        console.log(`Sorry, you failed 😢 The correct number was ${secretNumber}.`);
        break;
    }

} while (guessNumber !== secretNumber);
