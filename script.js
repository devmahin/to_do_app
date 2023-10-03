const add = document.getElementById("add");
const input = document.getElementById("input");
const list = document.getElementById("list");
const form = document.querySelector("form");

const addTodo = (e) => {
  e.preventDefault();
  const inputValue = input.value;
  // uniqueId
  let todoID = Date.now().toString();
  createTodo(todoID, inputValue);
  showMessage("Todo is addedd", "success");

  const todos = getTodosLocalStores();
  todos.push({ todoID, inputValue });
  localStorage.setItem("todo", JSON.stringify(todos));

  input.value = "";
};

const getTodosLocalStores = () => {
  return localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
};

const createTodo = (todoID, inputValue) => {
  let li = document.createElement("li");
  li.id = todoID;
  li.innerHTML = `
        <span>${inputValue}</span>
        <span><button id="Deletebtn"><i class="ri-delete-bin-6-fill"></i></button></span>
    `;
  list.appendChild(li);

  ////////////////////

  const deleteBtn = li.querySelector("#Deletebtn");
  deleteBtn.addEventListener("click", deleteTodos);
};

const deleteTodos = (e) => {
  const selectedTodo = e.target.parentElement.parentElement.parentElement;
  console.log(selectedTodo);
  list.removeChild(selectedTodo);

  showMessage("Todo is delete", "danger");

  let todos = getTodosLocalStores();

  todos = todos.filter((todo) => todo.todoID !== selectedTodo.id);
  localStorage.setItem("todo", JSON.stringify(todos));
};

const showMessage = (text, status) => {
  let message = document.getElementById("message");
  message.classList.add(`bg-${status}`);
  message.innerText = text;

    setTimeout(() => {
    message.innerText = "";
    message.classList.remove(`bg-${status}`);
  }, 2000);
};

const loadTodos = () => {
    let todo = getTodosLocalStores()
    todo.map((todo) => {
        createTodo(todo.todoID, todo.inputValue)
    })
}


form.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);



