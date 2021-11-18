/*
[V] 할일을 입력하면 리스트에 노출
  -> 입력창, add 버튼 만들기 V
  -> 리스트 만들기 V
  -> add 버튼이 클릭했을 때, addEventListner을 통해 입력값을 리스트에 넣어줌 V
  -> 리스트 창을 보이게 함 (classList를 활용) V
[V] 리스트에 체크박스를 누르면 완료된 일로 노출(취소선) V
  -> 리스트 안에 체크박스 만들기 (checkbox 만드는 법 검색) V
  -> 체크박스가 체크되었을 때, addEventLister를 통해 해당 리스트에 취소선 긋기 V
[V] 휴지통을 누르면 삭제
  -> 휴지통 버튼 만들기 V
  -> 휴지통을 클릭했을 때, 해당 리스트를 삭제하기 (display : none 활용) V
[] 그 외의 필요한 기능을 추가 (optional)
*/

const $todoList = document.getElementById("todo-list");
const $addButton = document.getElementById("add-button");
const $newTaskInput = document.getElementById("new-task");
let taskContent = "";

$addButton.addEventListener("click", () => {
  taskContent = $newTaskInput.value;
  makeList(taskContent);
  $newTaskInput.value = "";
});

function makeList(taskContent) {
  const tasklist = document.createElement("li");
  tasklist.classList.add("task-list");
  tasklist.innerHTML = putContent(taskContent);
  $todoList.appendChild(tasklist);
  putEventListener(tasklist);
}

function putEventListener(tasklist) {
  const checkbox = tasklist.children[0];
  const garbageButton = tasklist.children[1];
  checkbox.addEventListener("change", findcheckedList);
  garbageButton.addEventListener("click", deleteList);
}

function putContent(taskContent) {
  return `<input type="checkbox" name="checkbox"/>
  ${taskContent}
  <button class="garbage-button"><img src="../image/garbage.jpg" alt="grabage-image" /></button>`;
}

function findcheckedList(event) {
  const checkbox = event.target;
  if (checkbox.checked) {
    checkbox.parentElement.classList.add("line-through");
  } else {
    checkbox.parentElement.classList.remove("line-through");
  }
}

function deleteList(event) {
  const garbageButton = event.target;
  garbageButton.parentElement.parentElement.remove();
}
