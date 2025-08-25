// Save user in LocalStorage
function saveUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return false;
  }
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

// Authenticate user
function authenticateUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find(u => u.username === username && u.password === password);
}

// Save session
function setSession(username) {
  localStorage.setItem("sessionUser", username);
}

// Get session
function getSession() {
  return localStorage.getItem("sessionUser");
}

// Clear session
function clearSession() {
  localStorage.removeItem("sessionUser");
}

// Register form
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (saveUser(username, password)) {
      alert("Registered successfully! Please login.");
      window.location.href = "index.html";
    }
  });
}

// Login form
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (authenticateUser(username, password)) {
      setSession(username);
      window.location.href = "secure.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// Secure page access check
if (window.location.pathname.includes("secure.html")) {
  if (!getSession()) {
    alert("You must be logged in to view this page!");
    window.location.href = "index.html";
  }
}

// Logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    clearSession();
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
}

