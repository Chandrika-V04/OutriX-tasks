let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = "text";
    input.value = task;
    input.disabled = true;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      input.disabled = !input.disabled;
      if (input.disabled) {
        taskList[index] = input.value;
        saveTasks();
        displayTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      taskList.splice(index, 1);
      saveTasks();
      displayTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(input);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task !== "") {
    taskList.push(task);
    saveTasks();
    displayTasks();
    taskInput.value = "";
  }
}

// Initial display
displayTasks();
