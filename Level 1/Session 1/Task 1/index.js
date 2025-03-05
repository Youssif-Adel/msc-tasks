const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");

const allButton = document.getElementById("all-button");
const completedButton = document.getElementById("completed-button");
const pendingButton = document.getElementById("pending-button");

const list = document.getElementById("list");

const storage = localStorage.getItem("tasks");
const tasks = storage ? JSON.parse(storage) : [];
let currentFilter = "all"; // all, completed, pending

addButton.addEventListener("click", addTask);

updateList();

function addTask() {
  const text = taskInput.value;

  if (!text) {
    alert("Please enter a task");
    return;
  }

  const task = { text, status: "pending" };

  taskInput.value = "";
  taskInput.focus();

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateList();
}

function updateList() {
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    if (currentFilter !== "all" && tasks[i].status !== currentFilter) continue;

    let { text, status } = tasks[i];

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const taskElement = document.createElement("li");
    taskElement.innerText = text;
    if (status === "completed") {
      taskElement.classList.add("completed");
    }
    taskContainer.appendChild(taskElement);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    taskContainer.appendChild(buttonContainer);

    if (status !== "completed") {
      const completeButton = document.createElement("button");
      completeButton.innerText = "✔️";
      completeButton.classList.add("action-button");
      buttonContainer.appendChild(completeButton);
      completeButton.addEventListener("click", () => {
        tasks[i].status = "completed";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateList();
      });
    }

    if (status !== "completed") {
      const editButton = document.createElement("button");
      editButton.innerText = "✏️";
      editButton.classList.add("action-button");
      buttonContainer.appendChild(editButton);
      editButton.addEventListener("click", () => {
        const newText = prompt("Enter new text", text);
        if (newText) {
          tasks[i].text = newText;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          updateList();
        }
      });
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.classList.add("action-button");
    buttonContainer.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      updateList();
    });

    list.appendChild(taskContainer);
  }
}

allButton.addEventListener("click", () => {
  currentFilter = "all";
  resetButtons();
  allButton.classList.add("active");
  allButton.disabled = true;
  updateList();
});

completedButton.addEventListener("click", () => {
  currentFilter = "completed";
  resetButtons();
  completedButton.classList.add("active");
  completedButton.disabled = true;
  updateList();
});

pendingButton.addEventListener("click", () => {
  currentFilter = "pending";
  resetButtons();
  pendingButton.classList.add("active");
  pendingButton.disabled = true;
  updateList();
});

function resetButtons() {
  allButton.disabled = false;
  allButton.classList.remove("active");

  completedButton.disabled = false;
  completedButton.classList.remove("active");

  pendingButton.disabled = false;
  pendingButton.classList.remove("active");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
