document.getElementById("addBtn").addEventListener('click', function(){
     let input = document.getElementById("taskInput");
     let taskText = input.value;

     if(taskText === "") return;

     let li = document.createElement("li");
     li.innerText = taskText;

     li.addEventListener('click', function(){
        li.style.textDecoration= li.style.textDecoration === 'line-through' ? 'none' : 'line-through';
     })
     let delbtn = document.createElement("button");
     delbtn.innerText = "❌";
     delbtn.addEventListener("click", function() {
        li.remove();
    });
    
   
    li.appendChild(delbtn);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
})

 let removebtn = document.getElementById("button");
    removebtn.innerText= "🗑️"
    removebtn.addEventListener("click", function() {
       document.getElementById("taskList").innerHTML = "";
    });