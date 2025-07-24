const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const todoBody = document.getElementById("todo-body");

let todos = [];

function renderTodos(list = todos) {
  todoBody.innerHTML = "";

  if (list.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  list.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td class="status">Pending</td>
      <td>
        <button class="btn-delete" onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;

    todoBody.appendChild(row);
  });
}

function addTodo() {
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please enter both task and date.");
    return;
  }

  todos.push({ task, date });
  todoInput.value = "";
  dateInput.value = "";
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAllTodos() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    renderTodos();
  }
}

function filterTodos() {
  const filterDate = dateInput.value;
  if (filterDate === "") {
    alert("Please select a date to filter.");
    return;
  }

  const filtered = todos.filter(todo => todo.date === filterDate);
  renderTodos(filtered);
}

// Event Listeners
addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAllTodos);
filterBtn.addEventListener("click", filterTodos);

// Initial render
renderTodos();