/*
[V] 할일을 입력하면 리스트에 노출
  -> 입력창, add 버튼 만들기 V
  -> 리스트 만들기 V
  -> add 버튼이 클릭했을 때, addEventListner을 통해 입력값을 리스트에 넣어줌 V
  -> 리스트 창을 보이게 함 V
[V] 리스트의 체크박스를 누르면, 해당 리스트를 취소선 그음 V
  -> 리스트 안에 체크박스 만들기 V
  -> 체크박스가 체크되었을 때, addEventLister를 통해 해당 리스트에 취소선 긋기 V
[V] 휴지통을 누르면 삭제
  -> 휴지통 버튼 만들기 V
  -> 휴지통을 클릭했을 때, 해당 리스트를 삭제하기 (remove 메소드 사용) V
[V] function들을 class화 하기
*/

class TodoListManager {
  constructor(taskContent) {
    this.taskContent = taskContent;
  }

  makeList() {
    const $todoList = document.getElementById("todo-list");
    const tasklist = document.createElement("li");
    tasklist.classList.add("task-list");
    tasklist.innerHTML = this.putContent(this.taskContent);
    $todoList.appendChild(tasklist);
    return this.putEventListener(tasklist);
  }

  putContent() {
    return `<input type="checkbox" name="checkbox"/>
    ${this.taskContent}
    <button class="garbage-button"><img src="../image/garbage.jpg" alt="grabage-image" /></button>`;
  }

  putEventListener(tasklist) {
    const checkbox = tasklist.children[0];
    const garbageButton = tasklist.children[1];
    checkbox.addEventListener("change", this.findcheckedList);
    garbageButton.addEventListener("click", this.deleteList);
  }

  findcheckedList(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
      checkbox.parentElement.classList.add("line-through");
    } else {
      checkbox.parentElement.classList.remove("line-through");
    }
  }

  deleteList(event) {
    const garbageButton = event.target;
    garbageButton.parentElement.parentElement.remove();
  }
}

const $addButton = document.getElementById("add-button");
const $newTaskInput = document.getElementById("new-task");

$addButton.addEventListener("click", () => {
  const taskContent = $newTaskInput.value;
  const todoListManager = new TodoListManager(taskContent);
  todoListManager.makeList(taskContent);
  $newTaskInput.value = "";
});
