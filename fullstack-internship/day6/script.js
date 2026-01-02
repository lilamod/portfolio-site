document.getElementById("demo").innerHTML = "Hello DOM!";
document.getElementsByClassName("title")[0].style.color = "red";
document.querySelector(".title").style. color= "blue";

document.getElementById("para").innerHTML ="Practice Task";
document.getElementById("para").style.color = "red";
document.getElementById("para").style.fontSize = "40px";
document.getElementById("para").innerText = "New Text Here!";
document.getElementById("para").innerHTML = "<b>Bold Text</b>";

function changeColor(){
    console.log("click");
    document.getElementById('body-group').style.backgroundColor = "yellow";
}

document.getElementById("btn").addEventListener("click", ()=>{
    alert("button clicked")
})

document.getElementById("name").addEventListener("input", function() {
    document.getElementById("display").innerHTML = this.value
})

// let newItem = document.createElement("li");
// newItem.innerText = "New Task";
// document.getElementById("tasklist").appendChild(newItem);

document.getElementById("addTask").addEventListener('click', function(){
    let newTaskItem = document.createElement("li");
    newTaskItem.innerText = document.getElementById("taskList").value;
    document.getElementById("tasklist").appendChild(newTaskItem);
})


document.getElementById("addTask").addEventListener('click', function(){
let counter = 1;
let addbtn = document.createElement("button");
     addbtn.innerText = "➕";
     addbtn.addEventListener("click", function() {
        counter++;
    });

let delbtn = document.createElement("button");
     delbtn.innerText = "➖";
     delbtn.addEventListener("click", function() {
        counter--
    });

document.getElementById("counter").innerHTML = counter;
    // let counterValue = document.createElement("p");
    // counterValue.innerText = counter;
})

let count = 0;

    function increase() {
      count++;
      document.getElementById("count").textContent = count;
    }

    function decrease() {
      count--;
      document.getElementById("count").textContent = count;
    }

  const limit = 280;
const textarea = document.getElementById("textarear");
const counter = document.getElementById("counter");

textarea.addEventListener("input", function () {
    let length = this.value.length;

    counter.textContent = `${length} / ${limit}`;

    if (length > limit) {
        counter.style.color = "red";
    } else {
        counter.style.color = "black";
    }
});
