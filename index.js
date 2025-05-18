let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskDisplay = document.getElementById("taskDisplayContainer");
const addButton = document.getElementById("addButton");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskDisplay.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card card p-3 mb-2";

    const title = document.createElement("h5");
    title.innerText = task.title;
    title.style.textDecoration = task.completed ? "line-through" : "none";

    const deadline = document.createElement("p");
    deadline.innerText = `Deadline: ${task.deadline}`;

    const priority = document.createElement("span");
    priority.innerText = task.priority;
    priority.className = `badge ${getPriorityColor(task.priority)}`;

    const status = document.createElement("p");
    status.innerText = `Status: ${task.completed ? "Completed" : "Pending"}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm mx-1";
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Edit title:", task.title);
      const newPriority = prompt(
        "Edit priority (High/Medium/Low):",
        task.priority
      );
      const newDeadline = prompt("Edit deadline (YYYY-MM-DD):", task.deadline);
      if (newTitle && newPriority && newDeadline) {
        task.title = newTitle;
        task.priority = newPriority;
        task.deadline = newDeadline;
        saveTasks();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    const actions = document.createElement("div");
    actions.appendChild(checkbox);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    taskCard.classList.add("task-card");
    taskCard.appendChild(title);
    taskCard.appendChild(priority);
    taskCard.appendChild(deadline);
    taskCard.appendChild(status);
    taskCard.appendChild(actions);

    taskDisplay.appendChild(taskCard);
  });
}

function getPriorityColor(priority) {
  switch (priority.toLowerCase()) {
    case "high":
      return "badge-danger";
    case "medium":
      return "badge-warning";
    case "low":
      return "badge-success";
    default:
      return "badge-secondary";
  }
}

addButton.addEventListener("click", () => {
  const title = taskInput.value.trim();
  const priority = priorityInput.value;
  const deadline = deadlineInput.value;

  const newTask = {
    title,
    priority,
    deadline,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  priorityInput.value = "Medium";
  deadlineInput.value = "";
});

renderTasks();
