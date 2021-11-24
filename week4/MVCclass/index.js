/*
[V] Model, View, Controller Class로 나누기
[V] 수정 기능 추가
[V] 할일 목록, 한일 목록으로 나누기
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
    this.todos.map((todo) => {
      if (todo.id === id) {
        return todo.text = updatedText;
      }
    });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

}

class TodoView {
  constructor({model, $todoList}) {
    this.model = model;
    this.$todoList = $todoList;
    this.$completeTodoList = $completeTodoList;
  }
  createElement(tag, className) {
    const $element = document.createElement(tag);
    if (className) $element.classList.add(className);
    return $element;
  }

  displayTodo(todo) {
    const $taskList = this.createElement("li", "task-list");
    $taskList.innerHTML = `<input type="checkbox" id="checkbox${todo.id}"/>
    <span>${todo.text}</span>
    <button id="modify-button${todo.id}" class="modify-button"> 수정 </button>
    <button id="garbage-button${todo.id}" class="garbage-button"><img src="../image/garbage.jpg" alt="grabage-image" /></button>`;
    this.$todoList.append($taskList);
  }

  renderTodo(newTodoText) {
    const newTodo = this.model.addTodo(newTodoText);
    this.displayTodo(newTodo);
    return newTodo;
  }
}

class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  displayTodoList() {
    this.model.todos.forEach((todo) => {
      this.view.displayTodo(todo);
      this.bindTodo(todo);
    });
  }

  bindTodo(todo) {
    this.handleCheckTodo(todo);
    this.handleModifyTodo(todo);
    this.handleDeleteTodo(todo);
  }

  handleAddTodo() {
    const $addButton = document.getElementById("add-button");
    $addButton.addEventListener("click", () => {
      const $inputTask = document.getElementById("new-task");
      const newTodo = this.view.renderTodo($inputTask.value);
      this.bindTodo(newTodo);
      $inputTask.innerHTML = "";
    })
  }

  handleCheckTodo(todo) {
    const checkboxID = `checkbox${todo.id}`;
    const $checkbox = document.getElementById(checkboxID);
    $checkbox.addEventListener("change", () => {
      const checkedTodo = $checkbox.parentElement;
      if ($checkbox.checked) {
        $completeTodoList.append(checkedTodo);
      } else {
        $todoList.append(checkedTodo);
      }
    });
  }

  handleModifyTodo(todo) {
    const id = todo.id;
    const buttonID = `modify-button${id}`;
    const $modifyButton = document.getElementById(buttonID);
    $modifyButton.addEventListener("click", () => {
      const modifiedtodo = $modifyButton.parentElement.children[1];
      modifiedtodo.contentEditable = true;
      modifiedtodo.addEventListener("focusout", (event) => {
        modifiedtodo.contentEditable = false;
        this.model.editTodo(id, event.target.innerText);
      })
    });
  }

  handleDeleteTodo(todo) {
    const id = todo.id;
    const buttonID = `garbage-button${id}`;
    const $garbageButton = document.getElementById(buttonID);
    $garbageButton.addEventListener("click", () => {
      $garbageButton.parentElement.remove();
      this.model.deleteTodo(id);
    })
  }
}

const $todoList = document.getElementById("todo-list");
const $completeTodoList = document.getElementById("complete-todo-list");

const model = new TodoModel();
const view = new TodoView({model, $todoList, $completeTodoList});
const controller = new TodoController(model, view);
controller.displayTodoList();
controller.handleAddTodo();
