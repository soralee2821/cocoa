/*
[V] Model, View, Controller Class로 나누기
[] 수정 기능 추가
[] 할일 목록, 한일 목록으로 나누기
[] 날짜별 ToDo 보는 기능 만들기
[] CSS - 레이어 카드 UI로 만들기
*/

class TodoModel {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('21.11.22')) || [];
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    }
    this.todos.push(todo);
    return todo;
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) => {
      todo.id === id ? {id: todo.id, text, updatedText, complete: false} : todo;
    });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

}

class TodoView {
  constructor(model) {
    this.model = model;
  }
  createElement(tag, className) {
    const $element = document.createElement(tag);
    if (className) $element.classList.add(className);
    return $element;
  }

  displayTodo(todo) {
    const $todoList = document.getElementById("todo-list");
    const taskList = this.createElement("li", "task-list");

    const checkbox = this.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;

    const span = this.createElement("span");
    span.value = todo.text;

    const garbageButton = this.createElement("button", "garbage-button");
    const garbageImage = this.createElement("img");
    garbageImage.src = "../image/garbage.jpg";
    garbageImage.alt = "garbage-image";
    garbageButton.append(garbageImage);

    taskList.append(checkbox, span, garbageButton);
    $todoList.append(taskList);
  }
}

class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  initTodo(todo) {
    this.view.displayTodo(todo);
    this.handleCheckTodo(todo);
    this.handleDeleteTodo(todo);
  }
  displayTodoList() {
    this.model.todos.forEach((todo) => this.initTodo(todo));
  }

  handleAddTodo() {
    const $addButton = document.getElementById("add-button");
    $addButton.addEventListener("click", () => {
      const $newTaskInput = document.getElementById("new-task");
      this.model.addTodo($newTaskInput.value);
      const newTodo = this.model.todos[this.model.todos.length -1];
      this.initTodo(newTodo);
    })
  }

  handleCheckTodo(todo) {
    const checkbox = todo.children[0];
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkbox.parentElement.classList.add("line-through");
      } else {
        checkbox.parentElement.classList.remove("line-through");
      }
    });
  }

  handleDeleteTodo(todo) {
    const id = todo.id;
    this.model.deleteTodo(id);
  }
}

const model = new TodoModel();
const view = new TodoView(model);
const controller = new TodoController(model, view);
controller.displayTodoList();
controller.handleAddTodo();
