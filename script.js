window.addEventListener("DOMContentLoaded", function () {
  let todoInput = document.querySelector(".todo-input");
  let addBtn = document.querySelector(".todo-add-button");
  let todoList = document.querySelector(".todo-list");

  let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

  // To show list at the start of the webpage load

  if (tasks.length != 0) {
    for (const task of tasks) {
      let listItem = document.createElement("li");

      let taskSpan = document.createElement("span");
      taskSpan.textContent = task.content;
      taskSpan.setAttribute("data-id", task.id);

      if (task.complete) {
        taskSpan.classList.add("complete");
      }

      let delBtn = document.createElement("button");
      delBtn.textContent = "Delete";

      listItem.appendChild(taskSpan);
      listItem.appendChild(delBtn);
      todoList.appendChild(listItem);
    }
  }

  //move the cursor focus on input if "/" key is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "/") {
      e.preventDefault();
      todoInput.focus();
    }
  });

  // if the add button is clicked
  addBtn.addEventListener("click", () => {
    addTask();
  });

  // also if the enter key is pressed
  todoInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  todoList.addEventListener("click", function (event) {
    const target = event.target;

    // Handle delete button click
    if (target.tagName === "BUTTON") {
      const listItem = target.parentNode;
      tasks = tasks.filter((e) => e.id != listItem.firstChild.dataset.id);
      storeTask();
      listItem.remove();
    }
    // Handle task completion (clicking on the li but not the button)
    else if (target.tagName === "LI") {
      //first child : span
      let spanTag = target.firstChild;
      spanTag.classList.toggle("complete");
      tasks.forEach((element) => {
        if (element.id == spanTag.dataset.id) {
          element.complete = !element.complete;
        }
      });

      storeTask();
    }
  });

  function storeTask() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }

  function addTask() {
    let taskValue = todoInput.value.trim();
    if (taskValue === "") {
      return;
    }

    let task = {
      id: Date.now(),
      content: taskValue,
      complete: false,
    };

    tasks.push(task);
    todoInput.value = "";

    let listItem = document.createElement("li");

    // Wrap task content in span
    let taskSpan = document.createElement("span");
    taskSpan.textContent = task.content;
    taskSpan.setAttribute("data-id", task.id);

    // Create delete button
    let deleteItem = document.createElement("button");
    deleteItem.innerText = "Delete";

    // Append span and button
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteItem);

    todoList.appendChild(listItem);
    storeTask();
  }
});
