const taskButton = document.getElementById("task-button");
const newTaskParagraph = document.getElementById("new-task-paragraph");
const taskInput = document.getElementById("task-input");

const listElement = document.getElementById("list");

const showAllButton = document.getElementById("show-all");
const showPendingButton = document.getElementById("show-pending");
const showCompleted = document.getElementById("show-completed");

let filter = "all"; // all, pending, completed

const stringTasks = localStorage.getItem("tasks");
const tasks = JSON.parse(stringTasks) || [];
renderTasks();

// Handling the button click
let isActive = false;

taskButton.addEventListener("click", handleTaskButtonClick);

function handleTaskButtonClick(e) {
  if (e.type !== "blur") {
    if (e.target === taskInput) return;
  }
  taskInput.classList.toggle("hidden");
  newTaskParagraph.classList.toggle("hidden");
  taskButton.classList.toggle("active");
  isActive = !isActive;

  if (isActive) taskInput.focus();
}

taskInput.addEventListener("blur", handleTaskButtonClick);

// Handling adding task
taskInput.addEventListener("keydown", addTask);

function addTask(e) {
  if (e.key !== "Enter") return;

  const text = taskInput.value;
  if (!text) return;

  taskInput.value = "";

  const task = { text, isCompleted: false };
  tasks.push(task);

  renderTasks();
  saveTasks();
}

function renderTasks() {
  listElement.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const { text, isCompleted } = tasks[i];

    if (filter === "completed" && !isCompleted) continue;
    if (filter === "pending" && isCompleted) continue;

    const div = document.createElement("div");
    div.classList.add("task-container");

    const listItem = document.createElement("li");
    listItem.innerText = text;
    div.appendChild(listItem);
    if (isCompleted) listItem.classList.add("completed");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    if (!isCompleted) {
      const completeButton = document.createElement("button");
      completeButton.classList.add("task-button");
      completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      buttonsContainer.appendChild(completeButton);

      completeButton.addEventListener("click", () => {
        tasks[i].isCompleted = true;
        renderTasks();
        saveTasks();
      });
    }

    if (!isCompleted) {
      const editButton = document.createElement("button");
      editButton.classList.add("task-button");
      editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
      buttonsContainer.appendChild(editButton);

      editButton.addEventListener("click", () => {
        const newText = prompt("Enter the new task");
        tasks[i].text = newText;
        renderTasks();
        saveTasks();
      });
    }

    const removeButton = document.createElement("button");
    removeButton.classList.add("task-button");
    removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    buttonsContainer.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      console.log(i);
      tasks.splice(i, 1);
      renderTasks();
      saveTasks();
    });

    div.appendChild(buttonsContainer);

    listElement.appendChild(div);
  }
}

// Filter buttons handling
showAllButton.addEventListener("click", () => {
  filter = "all";
  resetButtons();
  showAllButton.classList.add("active");
  renderTasks();
});

showCompleted.addEventListener("click", () => {
  filter = "completed";
  resetButtons();
  showCompleted.classList.add("active");
  renderTasks();
});

showPendingButton.addEventListener("click", () => {
  filter = "pending";
  resetButtons();
  showPendingButton.classList.add("active");
  renderTasks();
});

function resetButtons() {
  showAllButton.classList.remove("active");
  showCompleted.classList.remove("active");
  showPendingButton.classList.remove("active");
}

// Save Tasks
function saveTasks() {
  const stringTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stringTasks);
}
