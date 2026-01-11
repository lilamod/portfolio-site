
let projects = ["Calculator App", "To-Do List", "Number Guessing Game"];
let projectList = document.getElementById("project-list");

projects.forEach(p => {
    let li = document.createElement("li");
    li.innerText = p;
    projectList.appendChild(li);
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let msg = document.getElementById("formMessage");

    if (name === "" || email === "" || message === "") {
        msg.innerText = "All fields are required!";
        msg.style.color = "red";
    } else if (!email.includes("@")) {
        msg.innerText = "Please enter a valid email!";
        msg.style.color = "red";
    } else {
        msg.innerText = "Message sent successfully!";
        msg.style.color = "green";
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});