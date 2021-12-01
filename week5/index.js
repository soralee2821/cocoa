const data = [{
  "id": 1,
  "name": "모던 자바스크립트 deep dive",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 2,
  "name": "자바스크립트 완벽 가이드",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 3,
  "name": "Do it! 자바스크립트+제이쿼리 입문",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 4,
  "name": "모던 자바스크립트 핵심 가이드",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 5,
  "name": "러닝 자바스크립트",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 6,
  "name": "Do it! 점프 투 파이썬",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 7,
  "name": "혼자 공부하는 첫 프로그래밍 with 파이썬",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 8,
  "name": "파이썬 머신러닝 완벽 가이드",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 9,
  "name": "파이썬 알고리즘 인터뷰",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 10,
  "name": "파이썬 증권 데이터 분석",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 11,
  "name": "리액트를 다루는 기술",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 12,
  "name": "리액트 네이티브를 다루는 기술",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 13,
  "name": "Do it! 리액트 네이티브 앱 프로그래밍",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 14,
  "name": "리액트 교과서",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 15,
  "name": "실전 리액트 프로그래밍",
  "borrowState": true,
  "returnDate": ""
}]

class LibraryModel {
  constructor(data) {
    this.bookStorage = data;
  }

  addBook(bookName) {
    const totalBooks = this.bookStorage.length;
    const book = {
      id: totalBooks > 0 ? totalBooks + 1 : 1,
      name: bookName,
      borrowState: true,
      returnDate: "",
    }
    this.bookStorage.push(book);
  }

  deleteBook(bookID) {
    this.bookStorage = this.bookStorage.filter((book) => book.id !== bookID);
  }

  pickBook(bookID) {
    let pickedBook;
    this.bookStorage.forEach((book) => {
      if (book.id === bookID) {
        pickedBook = book;
      }
    });
    return pickedBook;
  }

  updateBorrowState(bookID, borrowState) {
    this.bookStorage.map((book) => {
      if (book.id === bookID) {
        book.borrowState = borrowState;
      }
    })
  }
}

class LibraryView {
  constructor(model, {$bookTable, $displayContainer, $displayBook}) {
    this.model = model;
    this.$bookTable = $bookTable;
    this.$displayContainer = $displayContainer;
    this.$displayBook = $displayBook;
  }
  makeElement(tagName, className, typeName) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    if (typeName) {
      element.type = typeName;
    }
    return element;
  } 

  makeTableElement(tagName1, tagName2, book) {
    const element = document.createElement(tagName1);
    if (Array.isArray(book)) {
      book.forEach((content) => {
        const childElement = document.createElement(tagName2);
        childElement.textContent = content;
        element.append(childElement);
      });
      return element;
     } else if (typeof book === "object") {
      for (let content of Object.keys(book)) {
        const childElement = document.createElement(tagName2);
        if (content === "borrowState") {
          if (book[content] === true) {
            book[content] = "대출가능";
          } else if (book[content] === false) {
            book[content] = "대출중";
          }
        }
        childElement.textContent = book[content];
        element.append(childElement);
      }
      return element;
    }
  }

  makeImageElement(book) {
    const image = this.makeElement("img", "book-image");
    image.src = `image/${book.id}.png`;
    image.alt = book.name;
    return image;
  }

  displayBookTable(bookList) {
    const $bookTable = this.makeElement("table", "book-table");
    const bookContent = Object.keys(bookList[0]);
    const tableHeader = this.makeTableElement("tr", "th", bookContent);
    $bookTable.append(tableHeader);
    bookList.forEach((book) => {
      const tableRow = this.makeTableElement("tr", "td", book);
      $bookTable.append(tableRow);
    });
    this.$displayContainer.append($bookTable);
    return $bookTable;
  }

  displaySelectedBook(book) {
    this.$displayContainer.classList.toggle("invisible");
    this.$displayBook.classList.toggle("invisible");
    this.$displayBook.textContent = "";
    const image = this.makeImageElement(book);
    const $bookTable = this.makeElement("table", "book-table");
    Object.entries(book).forEach((content) => {
      const tableRow = this.makeTableElement("tr", "td", content);
    $bookTable.append(tableRow);
    });
    this.$displayBook.append(image, $bookTable);
    const $borrowButton = this.makeElement("button", "borrow-button", "button");
    $borrowButton.innerText = "Borrow?";
    console.log($borrowButton);
  }
}

class LibraryManager {
  constructor(model, view, {$findButton, $inputText, $bookTable, $displayContainer, $displayBook}) {
  this.model = model;
  this.view = view;
  this.$findButton = $findButton;
  this.$inputText = $inputText;
  this.$bookTable = $bookTable;
  this.$displayContainer = $displayContainer;
  this.$displayBook = $displayBook;
  }

  findBook() {
    this.$findButton.addEventListener("click", () => {
      this.$displayContainer.textContent = "";
      this.$displayBook.classList.add("invisible");
      this.$displayContainer.classList.remove("invisible");
      const bookName = this.$inputText.value;
      let foundBookList = [];
      this.model.bookStorage.forEach((book) => {
        if (book.name.includes(bookName)) {
          return foundBookList.push(book);
        }
      });
      if (foundBookList.length === 0) {
        this.$bookTable.textContent = "";
        this.$bookTable.textContent = "검색된 도서가 없습니다";
      } else {
        const $foundBookTable = this.view.displayBookTable(foundBookList);
        this.selectBook($foundBookTable);
      }
    });
  }

  selectBook($foundBookTable) {
    $foundBookTable.addEventListener("click", (event) => {
      event.preventDefault();
      const $tableRow = event.target.parentElement;
      const bookID = Number($tableRow.children[0].innerText);
      const selectedBook = this.model.pickBook(bookID);
      this.view.displaySelectedBook(selectedBook);
    })
  }
}

//const data = require("./data.json");
const $displayContainer = document.querySelector(".display-container");
const $displayBook = document.querySelector(".display-book");
const $bookTable = document.querySelector(".book-table");
const $findButton = document.querySelector(".find-button");
const $inputText = document.querySelector(".input-book-name");

const model = new LibraryModel(data);
const DOMgroup1 = {$bookTable, $displayContainer, $displayBook};
const view = new LibraryView(model, DOMgroup1);
const DOMgroup2 = {$findButton, $inputText, $bookTable, $displayContainer, $displayBook};
const manager = new LibraryManager(model, view, DOMgroup2);
manager.findBook();
