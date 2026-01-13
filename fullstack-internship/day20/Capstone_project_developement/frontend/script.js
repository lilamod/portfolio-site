const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url.includes("/signin") && !config.url.includes("/signup")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let currentEditUserId = null;

// Users
const tableBody = document.getElementById('tableBody');
const formDialog = document.getElementById('formDialog');
const openFormButton = document.getElementById('openFormButton');
const closeFormButton = document.getElementById('closeFormButton');
openFormButton?.addEventListener('click', () => formDialog.showModal());
closeFormButton?.addEventListener('click', () => formDialog.close());

const viewDialog = document.getElementById("viewDialog");
document.getElementById("closeViewButton")?.addEventListener("click", () => viewDialog.close());

const editDialog = document.getElementById("editDialog");
document.getElementById("closeUpdateButton")?.addEventListener("click", () => editDialog.close());

async function fetchUsers() {
  const searchInput = document.getElementById("searchInput");
  let searchValue = searchInput?.value || "";

  try {
    const res = await api.post("/users/get", { search: searchValue });
    renderUsers(res.data || []);
  } catch (err) {
    console.error(err);
  }
}

function renderUsers(users) {
  tableBody.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${new Date(user.createdAt).toLocaleString("en-GB").replace(",", "")}</td>
      <td>
        <i class="fas fa-eye action-icon view" onclick="viewUser('${user._id}')"></i>
        <i class="fas fa-edit action-icon update" onclick="editUser('${user._id}')"></i>
        <i class="fas fa-trash-alt action-icon delete" onclick="deleteUser('${user._id}')"></i>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

async function viewUser(id) {
  viewDialog.showModal();
  const res = await api.get(`/users/${id}`);
  const user = res.data;
  if (user) {
    document.getElementById("viewName").value = user.name;
    document.getElementById("viewEmail").value = user.email;
    document.getElementById("viewCreatedAt").value = new Date(user.createdAt).toLocaleString("en-GB").replace(",", "");
  }
}

async function editUser(id) {
  currentEditUserId = id;
  editDialog.showModal();
  const res = await api.get(`/users/${id}`);
  const user = res.data.user;
  if (user) {
    document.getElementById("edit_name").value = user.name;
    document.getElementById("edit_email").value = user.email;
  }
}

async function updateUser() {
  const name = document.getElementById("edit_name").value;
  const email = document.getElementById("edit_email").value;
  const password = document.getElementById("edit_password").value;
  if (!currentEditUserId) return;

  await api.put(`/users/${currentEditUserId}`, { name, email, password });
  editDialog.close();
  fetchUsers();
}

async function deleteUser(id) {
  if (!confirm("Delete this user?")) return;
  await api.delete(`/users/${id}`);
  fetchUsers();
}

async function createUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) return alert("All fields required");
  await api.post("/auth/signup", { name, email, password });
  formDialog.close();
  fetchUsers();
}

// Login
async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (!email || !password) return alert("Email and password required");

  const res = await api.post("/auth/signin", { email, password });
  localStorage.setItem("token", res.data.token);
  window.location.href = "dashboard.html";
}

document.getElementById("loginForm")?.addEventListener("submit", login);
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  if (confirm("Logout?")) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
});

// Posts
async function loadMyPosts() {
  const postList = document.getElementById("postList");
  if (!postList) return;
  const res = await api.get("/post/get");
  postList.innerHTML = "";
  res.data.forEach(post => {
    postList.innerHTML += `
      <div class="card">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${new Date(post.date).toDateString()}</small><br>
        <button onclick="editPost('${post._id}')">Edit</button>
        <button onclick="deletePost('${post._id}')">Delete</button>
      </div>
    `;
  });
}

document.getElementById("postForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const date = document.getElementById("date").value;
  if (!title || !content) return;

  await api.post("/post/create", { title, content, date });
  document.getElementById("postForm").reset();
  await loadMyPosts();
});

async function editPost(id) {
  const title = prompt("New title");
  const content = prompt("New content");
  if (!title || !content) return;
  await api.put(`/post/${id}`, { title, content });
  loadMyPosts();
}

async function deletePost(id) {
  if (!confirm("Delete this post?")) return;
  await api.delete(`/post/delete/${id}`);
  loadMyPosts();
}

// Blogs
async function loadPublicBlogs() {
  const container = document.getElementById("blogList");
  if (!container) return;
  const res = await api.post("/blog/public");
  container.innerHTML = "";
  res.data.forEach(blog => {
    container.innerHTML += `
      <div class="card">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <small>Views: ${blog.views} | Published: ${blog.publishedAt ? new Date(blog.publishedAt).toDateString() : "—"}</small>
      </div>
    `;
  });
}

document.getElementById("blogForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("blogId").value;
  const title = document.getElementById("blogTitle").value.trim();
  const content = document.getElementById("blogContent").value.trim();
  const status = document.getElementById("blogStatus").value;
  if (!title || !content) return alert("Title and content required");

  if (id) await api.put(`/blog/${id}`, { title, content, status });
  else await api.post("/blog", { title, content, status });

  document.getElementById("blogForm").reset();
  document.getElementById("blogId").value = "";
  await loadPublicBlogs();
});

// Tasks
async function loadTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;
  const res = await api.get("/task/get");
  list.innerHTML = "";
  res.data.forEach(task => {
    list.innerHTML += `<li>${task.title} <button onclick="deleteTask('${task._id}')">X</button></li>`;
  });
}

async function createTask() {
  const input = document.getElementById("taskTitle");
  const title = input.value.trim();
  if (!title) return;
  await api.post("/task/create", { title });
  input.value = "";
  await loadTasks();
}

async function deleteTask(id) {
  await api.delete(`/task/delete/${id}`);
  await loadTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  loadMyPosts();
  loadPublicBlogs();
  loadTasks();
});


function loadPage(page) {
  const iframe = document.getElementById('contentFrame');
  if (!iframe) return alert("Content frame not found!");
  iframe.src = page;
}

function logout(){
   localStorage.removeItem("token");
    window.location.href = "login.html";
}