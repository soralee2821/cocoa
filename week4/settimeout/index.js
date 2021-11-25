const $fruitDiv = document.querySelector(".show-fruits");
const $container = document.querySelector(".container");
const $fruitList = document.querySelector(".count-fruits");
const $fruitBoxes = document.querySelectorAll(".box");
let fruitStorage = new Map();
let isDelay = false;

$fruitDiv.addEventListener("mouseenter", showList);
console.log($fruitBoxes);
$fruitBoxes.forEach(($fruitBox) => {
  console.log($fruitBox);
  $fruitBox.addEventListener("mousemove", excuteTimer);
});

function showList() {
  const timer = setTimeout(() => {
    $container.classList.remove("hidden");
  }, 1000);
  $fruitDiv.addEventListener("mouseleave", () => {
    clearTimeout(timer);
  })
}

function excuteTimer(event) {
  if (!isDelay) {
    isDelay = true;
    setTimeout(() => {
      isDelay = false;
      getFruitName(event);
    }, 500);
  }
}

function getFruitName(event) {
  const fruit = event.target.innerText;
  countFruit(fruit);
  printFruit(fruitStorage);
  return;
}

function countFruit(fruit) {
  if (Object.prototype.hasOwnProperty.call(fruitStorage, fruit)) {
    fruitStorage[fruit] += 1;
  } else {
    fruitStorage[fruit] = 1;
  }
  return;
}

function printFruit(fruitStorage) {
  let fruitHTML = '';
  for (let fruit of Object.keys(fruitStorage)) {
    console.log(fruit);
    fruitHTML += `<li class="fruit">${fruit} : ${fruitStorage[fruit]}</li>`;
  }
  $fruitList.innerHTML = fruitHTML;
}