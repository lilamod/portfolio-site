
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("authForm");
  if (!authForm) return;

  let mode = "login";

  const submitBtn = document.getElementById("submitBtn");
  const toggleLink = document.getElementById("toggleLink");
  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const toggleText = document.getElementById("toggleText");
  const nameField = document.getElementById("nameField");

  if (!submitBtn || !toggleLink || !title || !subtitle || !toggleText || !nameField) {
    console.error("Auth HTML IDs missing");
    return;
  }

  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMode();
  });

  authForm.addEventListener("submit", handleSubmit);

  function toggleMode() {
    if (mode === "login") {
      mode = "signup";
      nameField.style.display = "block";
      title.innerText = "Note Application";
      subtitle.innerText = "Please sign up to continue";
      submitBtn.innerText = "Sign Up";
      toggleText.innerText = "Already have an account?";
      toggleLink.innerText = "Login";
    } else {
      mode = "login";
      nameField.style.display = "none";
      title.innerText = "Welcome Back";
      subtitle.innerText = "Please login to continue";
      submitBtn.innerText = "Login";
      toggleText.innerText = "Don’t have an account?";
      toggleLink.innerText = "Sign Up";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Loading...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("name").value.trim();

    try {
      if (mode === "login") {
        const res = await api.post("/auth/signin", { email, password });
        localStorage.setItem("token", res.data.token);
        window.location.href = "notesApp.html";
      } else {
        await api.post("/auth/signup", { name, email, password });
        alert("Signup successful! Please login.");
        toggleMode();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = mode === "login" ? "Login" : "Sign Up";
    }
  }
});


const notesDiv = document.getElementById("notes");

if (notesDiv) {
  document.addEventListener("DOMContentLoaded", () => {
    fetchNotes();

    document
      .getElementById("logoutBtn")
      ?.addEventListener("click", logout);

    document
      .getElementById("searchInput")
      ?.addEventListener("input", debounce((e) => {
        fetchNotes(e.target.value.trim());
      }, 300));

    document
      .getElementById("addNote")
      ?.addEventListener("click", addNote);
  });
}

async function fetchNotes(search = "") {
  try {
    const res = await api.get(`/note/get?search=${search}`);
    renderNotes(res.data);
  } catch (err) {
    if (err.response?.status === 401) logout();
  }
}

function renderNotes(notes) {
  notesDiv.innerHTML = notes
    .map(
      (n) => `
      <div class="note" style="background:${n.color || "#242529"}">
        <button class="deleteNote" onclick="deleteNote('${n._id}')">🗑</button>
        <h3>${n.title || "Note"}</h3>
        <p>${n.text}</p>
        <button onclick="pinNote('${n._id}', ${!n.pinned})">
          ${n.pinned ? "📌" : "📍"}
        </button>
      </div>
    `
    )
    .join("");
}

async function addNote() {
  const titleEl = document.getElementById("addTitle");
  const textEl = document.getElementById("addText");

  if (!titleEl || !textEl) {
    console.error("Note input fields missing");
    return;
  }

  const title = titleEl.value.trim();
  const text = textEl.value.trim();
  const color = document.getElementById("colorInput")?.value;

  if (!text) return alert("Note text is required");

  await api.post("/note/create", { title, text, color });

  titleEl.value = "";
  textEl.value = "";

  fetchNotes();
}


async function deleteNote(id) {
  if (!confirm("Delete this note?")) return;
  await api.delete(`/note/delete/${id}`);
  fetchNotes();
}

async function pinNote(id, pinned) {
  await api.put(`/note/update/${id}`, { pinned });
  fetchNotes();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "auth.html";
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
