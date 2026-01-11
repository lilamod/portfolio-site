fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));


fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {"Content-Type" :"application/json"},
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    })
})
.then(res => res.json())
.then(data => console.log("User Created:", data));


async function fetchUser(){
    let response = await fetch("http://localhost:3000/users");
    let users = await response.json();
    console.log("users", users)
    const table = document.createElement("table");
    table.style.border ="2 px solid black";

    const thead = document.createElement("thed");
    const headerRow = document.createElement("tr");
    const headers =["Name", "Email", "CreatedAt"];
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.border =" 2px solid black";
        th.style.padding = "8px";
        headerRow.appendChild(th);
    })
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    users.data.forEach(user =>{
        const row = document.createElement("tr");
        const values = [
            user.name,
            user.email,
            new Date(user.createdAt).toLocaleString("en-GB").replace(",", "")
        ];

        values.forEach(value =>{
            const td = document.createElement("td");
            td.textContent = value;
            td.style.border = "2px solid gray";
            td.style.padding = "8px";
            row.appendChild(td); 
        });

        tbody.appendChild(row);
    })
    table.appendChild(tbody);
    document.body.appendChild(table);
}
// fetchUser();

const formDialog = document.getElementById('formDialog');
const openFormButton = document.getElementById('openFormButton');
const closeFormButton = document.getElementById('closeFormButton');

openFormButton.addEventListener('click', () => {
    formDialog.showModal(); 
});

closeFormButton.addEventListener('click', () => {
     formDialog.close();
})

async function creatUser(){
    const email = document.getElementById('email').value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    console.log(email, name, password)


fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {"Content-Type" :"application/json"},
    body: JSON.stringify({
        email,
        name, 
        password
    })
})
}

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    
    async function fetchAndDisplayData() {
        try {
            const response = await fetch('http://localhost:3000/users'); 
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            

            renderTable(data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            loadingIndicator.textContent = 'Failed to load data. Please try again later.';
        }
    }

    function renderTable(users) {
        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${ new Date(user.createdAt).toLocaleString("en-GB").replace(",", "")}</td>
                <td>
                    <i class="fas fa-eye action-icon view" onclick="handleView('${user._id}')"></i>
                    <i class="fas fa-edit action-icon update" onclick="handleUpdate('${user._id}')"></i>
                    <i class="fas fa-trash-alt action-icon delete" onclick="handleDelete('${user._id}')"></i>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    fetchAndDisplayData();
});



