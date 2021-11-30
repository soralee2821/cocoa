const data = [{
  "id": 1,
  "name": "모던 자바스크립트 deep dive",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 2,
  "name": "자바스크립트로 배우는 웹 프로그래밍 A to Z",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 3,
  "name": "프론트엔드 개발자를 위한 자바스크립트 프로그래밍",
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
  "name": "파이썬",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 7,
  "name": "파이썬 머신러닝 완벽 가이드",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 8,
  "name": "파이썬 핵심 개발자들과의 인터뷰",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 9,
  "name": "모두의 알고리즘 with 파이썬",
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
  "name": "리액트 교과서",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 12,
  "name": "리액트를 다루는 기술",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 13,
  "name": "리액트 네이티브를 다루는 기술",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 14,
  "name": "Do it! 리액트 네이티브 앱 프로그래밍",
  "borrowState": true,
  "returnDate": ""
},
{
  "id": 15,
  "name": "러닝 리액트",
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

  updateBorrowState(bookID, borrowState) {
    this.bookStorage.map((book) => {
      if (book.id === bookID) {
        book.borrowState = borrowState;
      }
    })
  }
}

class LibraryView {
  constructor(model, {$bookTable, $displayContainer}) {
    this.model = model;
    this.$bookTable = $bookTable;
    this.$displayContainer = $displayContainer;
  }

  makeHTMLElement(tagName1, tagName2, book) {
    const element = document.createElement(tagName1);
    if (!tagName2 || !book) {
      return element;
    }
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
          book[content] = book[content] === true ? "대출가능" : "대출중";
        }
        childElement.textContent = book[content];
        element.append(childElement);
      }
      return element;
    }
  }

  displayBooks(bookList) {
    this.$bookTable.textContent = "";
    const bookContent = Object.keys(bookList[0]);
    const tableHeader = this.makeHTMLElement("tr", "th", bookContent);
    this.$bookTable.append(tableHeader);
    bookList.forEach((book) => {
      const tableRow = this.makeHTMLElement("tr", "td", book);
      this.$bookTable.append(tableRow);
    });
  }
}

class LibraryManager {
  constructor(model, view, {$findButton, $inputText, $bookTable}) {
  this.model = model;
  this.view = view;
  this.$findButton = $findButton;
  this.$inputText = $inputText;
  this.$bookTable = $bookTable;
  }

  findBook() {
    this.$findButton.addEventListener("click", () => {
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
        return this.view.displayBooks(foundBookList);
      }
    });
  }
}

//const data = require("./data.json");
const $displayContainer = document.querySelector(".display-container");
const $bookTable = document.querySelector(".book-table");
const $findButton = document.querySelector(".find-button");
const $inputText = document.querySelector(".input-book-name");

const model = new LibraryModel(data);
const view = new LibraryView(model, {$bookTable, $displayContainer});

const manager = new LibraryManager(model, view, {$findButton, $inputText, $bookTable});
manager.findBook();
