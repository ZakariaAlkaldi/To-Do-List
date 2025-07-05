// Get references to DOM elements
let input = document.getElementById("input");
let submit = document.getElementById("add");
let taskDiv = document.querySelector(".tasks");
let delAllBtn = document.getElementById("del-all");

// Array to store tasks
let arrayOfTasks = [];

// Load tasks from localStorage if available
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Display tasks on page load
getData();

// Add new task when submit button is clicked
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
    input.focus();
  }
};

// Delete all tasks when "Delete All" is clicked
delAllBtn.onclick = function () {
  taskDiv.innerHTML = "";
  localStorage.removeItem("tasks");
};

// Handle click events for deleting and completing tasks
taskDiv.addEventListener("click", (e) => {
  // Delete individual task
  if (e.target.classList.contains("del")) {
    delItem(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  // Toggle task completion
  if (e.target.classList.contains("task")) {
    taskComplete(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

// Add a new task object to the array and update UI/storage
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(), // Unique ID based on timestamp
    title: taskText,
    complated: false, // Task is not completed by default
  };

  arrayOfTasks.push(task);
  addTaskToPage(arrayOfTasks);
  saveData(arrayOfTasks);
}

// Render all tasks to the page
function addTaskToPage(arrayOfTasks) {
  taskDiv.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.complated) {
      div.className = "task done"; // Add 'done' class if completed
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create delete button for each task
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    taskDiv.appendChild(div);
  });
}

// Save tasks array to localStorage
function saveData(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// Load tasks from localStorage and render them
function getData() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTaskToPage(tasks);
  }
}

// Delete a task by its ID and update storage
function delItem(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  saveData(arrayOfTasks);
}

// Toggle completion status of a task by its ID and update storage
function taskComplete(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].complated == false
        ? (arrayOfTasks[i].complated = true)
        : (arrayOfTasks[i].complated = false);
    }
  }
  saveData(arrayOfTasks);
}

// Header theme toggle logic
const header = document.getElementById("main-header");
const toggleThemeBtn = document.getElementById("toggle-theme");

// Toggle dark/light theme for the whole page
toggleThemeBtn.onclick = function () {
  document.body.classList.toggle("dark-theme");
  // Optionally, save theme preference in localStorage
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

// On page load, apply saved theme
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }
});
