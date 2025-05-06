// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
  });
  
  function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
  
    if (taskText === "") return;
  
    const task = {
      text: taskText,
      completed: false
    };
  
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    input.value = "";
    renderTasks();
  }
  
  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    const tasks = getTasks();
  
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
  
      li.textContent = task.text;
  
      const actions = document.createElement("div");
      actions.className = "actions";
  
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "✓";
      completeBtn.className = "complete-btn";
      completeBtn.onclick = () => toggleComplete(index);
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteTask(index);
  
      actions.appendChild(completeBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(actions);
  
      taskList.appendChild(li);
    });
  }
  
  function toggleComplete(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
  }
  
  function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
  
  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }
  
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    renderTasks();
  }
  