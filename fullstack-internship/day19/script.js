const TASK_API = "http://localhost:3000/tasks";
const USER_API = "http://localhost:3000/users";

async function loadUsers() {
    const res = await axios.get(USER_API);
    console.log(res)
    const userSelect = document.getElementById("userSelect");

    userSelect.innerHTML = "";

    res.data.forEach(user => {
        const option = document.createElement("option");
        option.value = user._id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });

    loadTasks();
}

async function loadTasks() {
    const userId = document.getElementById("userSelect").value;
    if (!userId) return;

    const res = await axios.get(`${TASK_API}?userId=${userId}`);
    const tasks = res.data;

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox"
                ${t.completed ? "checked" : ""}
                onchange="toggleTask('${t._id}', ${!t.completed})"
            />

            <input
                value="${t.title}"
                class="${t.completed ? 'completed' : ''}"
                onchange="editTask('${t._id}', this.value)"
            />

            <strong>[${t.category}]</strong>

            <button onclick="deleteTask('${t._id}')">Delete</button>
        `;

        list.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById("taskInput").value;
    const category = document.getElementById("category").value;
    const userId = document.getElementById("userSelect").value;

    if (!title || !userId) return;

    await axios.post(TASK_API, {
        title,
        category,
        userId
    });

    document.getElementById("taskInput").value = "";
    loadTasks();
}

async function editTask(id, title) {
    await axios.put(`${TASK_API}/${id}`, { title });
}

async function toggleTask(id, completed) {
    await axios.put(`${TASK_API}/${id}`, { completed });
    loadTasks();
}

async function deleteTask(id) {
    await axios.delete(`${TASK_API}/${id}`);
    loadTasks();
}

loadUsers();
