const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = document.querySelector(".js-toDoForm input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = '';

let todos = [];

function loadToDos() {
  const loadTodos = localStorage.getItem(TODOS_LS);
  if (loadTodos !== null) {
    const parsedTodos = JSON.parse(loadTodos);

    parsedTodos.forEach((todo) => {
      paintTodos(todo.text);
    });
  }
}

function deleteTodo(event) {
  const target = event.target;
  const targetli = target.parentNode;
  toDoList.removeChild(targetli);

  const cleanTodos = todos.filter((todo) => {
    return todo.id !== parseInt(targetli.id);
  });

  todos = cleanTodos;
  saveTodos();
}

function successTodo(event) {
  const successTarget = event.target;
  //console.log(successTarget);
  successTarget.classList.add("success");
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodos(text) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const span = document.createElement("span");
  const newId = todos.length + 1;

  deleteButton.innerText = '✕';
  deleteButton.addEventListener("click", deleteTodo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(deleteButton);
  li.id = newId;

  toDoList.appendChild(li);
  li.addEventListener("click", successTodo);

  const toDoObj = {
    text: text,
    id: newId
  };

  todos.push(toDoObj);
  saveTodos();
}

function handleTodoSubmit(event) {
  event.preventDefault();
  if (toDoInput.value == '') return;
  const currentTodo = toDoInput.value;
  paintTodos(currentTodo);
  saveTodos(currentTodo);
  toDoInput.value = '';
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleTodoSubmit);
}

init();