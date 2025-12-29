let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let time = 1500; // 25min
let interval = null;

const themeToggle = document.getElementById("themeToggle");
const iconSVG = document.getElementById("iconSVG");

// Auto dark mode based on time (18:00–6:00)
const hour = new Date().getHours();
if (!localStorage.getItem("theme")) {
  if (hour >= 18 || hour < 6) {
    document.body.classList.add("dark");
    setMoonSunIcon();
  }
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
setMoonSunIcon();

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

// Toggle theme
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️"; // Sun for light mode
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙"; // Moon for dark mode
  }
};


// Change SVG icon with animation
function setMoonSunIcon() {
  if (document.body.classList.contains("dark")) {
    iconSVG.innerHTML = '<path d="M12 3C13.6569 3 15 4.34315 15 6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6C9 4.34315 10.3431 3 12 3ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"/>';
  } else {
    iconSVG.innerHTML = '<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zm-10.48 14.32l-1.79 1.8 1.41 1.41 1.8-1.79-1.42-1.42zm10.48 0l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zm-5.24-12.66c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>';
  }
}

// Tasks
function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  tasks.push(input.value);
  input.value = "";
  save();
  render();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${task}</span><button onclick="removeTask(${i})" aria-label="Delete task">✖</button>`;
    list.appendChild(li);
  });
}

function removeTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Timer
function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      interval = null;
      alert("Amazing focus session! 🌟");
      return;
    }
    time--;
    updateTimer();
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 1500;
  updateTimer();
}

function updateTimer() {
  const m = Math.floor(time / 60);
  const s = time % 60;
  document.getElementById("timer").textContent =
    `${m}:${s < 10 ? "0" : ""}${s}`;
}

render();
updateTimer();
