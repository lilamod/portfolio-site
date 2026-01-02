 const projects = [
      { title: "Portfolio Website", description: "Personal portfolio built with HTML, CSS, and JS." },
      { title: "To-Do App", description: "Task management app using JavaScript." },
      { title: "Weather App", description: "Fetches live weather data using an API." }
    ];

    const projectList = document.getElementById("projectList");

    projects.forEach(project => {
      const div = document.createElement("div");
      div.className = "project";
      div.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
      projectList.appendChild(div);
    });

    document.getElementById("contactForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const error = document.getElementById("formError");

      if (!name || !email || !message) {
        error.textContent = "All fields are required.";
        return;
      }

      error.textContent = "";
      alert("Message sent successfully!");
      this.reset();
    });


    document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let msg = document.getElementById("formMessage");
    let contactNumber = document.getElementById("contactnumber").value.trim();

    const phoneRegex = /^[0-9]{10}$/;
    if (name === "" || email === "" || message === "" || contactNumber) {
        msg.innerText = "All fields are required!";
        msg.style.color = "red";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.innerText = "Please enter a valid email!";
        msg.style.color = "red";
    } else if(!phoneRegex.test(contactNumber)){
        msg.innerText = "Enter valid contact number";
        msg.style.coor = "red";
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

const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleButton.addEventListener('click', function(){
    bodyElement.classList.toggle("dark-mode");
})