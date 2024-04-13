import { Cat, createCatName } from "./animal";

const name = createCatName();

interface ToDo {
  title: string;
  completed: boolean;
}
const todos: ToDo[] = readToDos();

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;

const form = document.querySelector("form")!;
const todoList = document.querySelector("#todolist")!;

todos.forEach(createToDo);

function readToDos(): ToDo[] {
  const todoasJSON = localStorage.getItem("todos");
  if (todoasJSON === null) {
    return [];
  }
  return JSON.parse(todoasJSON);
}

function handleSubmit(e: Event) {
  e.preventDefault();
  const newtodo: ToDo = {
    title: input.value,
    completed: false,
  };
  createToDo(newtodo);
  todos.push(newtodo);
  saveToDos();
  input.value = "";
}

function createToDo(todo: ToDo) {
  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    saveToDos();
  });
  newLi.append(checkbox);
  newLi.append(todo.title);
  todoList.append(newLi);
}

form.addEventListener("submit", handleSubmit);
