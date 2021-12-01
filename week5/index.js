const data = [{
  "id": 1,
  "name": "모던 자바스크립트 deep dive",
  "borrowState": "대출중",
  "returnDate": "2021-12-12"
},
{
  "id": 2,
  "name": "자바스크립트 완벽 가이드",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 3,
  "name": "Do it! 자바스크립트+제이쿼리 입문",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 4,
  "name": "모던 자바스크립트 핵심 가이드",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 5,
  "name": "러닝 자바스크립트",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 6,
  "name": "Do it! 점프 투 파이썬",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 7,
  "name": "혼자 공부하는 첫 프로그래밍 with 파이썬",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 8,
  "name": "파이썬 머신러닝 완벽 가이드",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 9,
  "name": "파이썬 알고리즘 인터뷰",
  "borrowState": "대출중",
  "returnDate": "2021-12-13"
},
{
  "id": 10,
  "name": "파이썬 증권 데이터 분석",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 11,
  "name": "리액트를 다루는 기술",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 12,
  "name": "리액트 네이티브를 다루는 기술",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 13,
  "name": "Do it! 리액트 네이티브 앱 프로그래밍",
  "borrowState": "대출가능",
  "returnDate": ""
},
{
  "id": 14,
  "name": "리액트 교과서",
  "borrowState": "대출중",
  "returnDate": "2021-12-14"
},
{
  "id": 15,
  "name": "실전 리액트 프로그래밍",
  "borrowState": "대출가능",
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
      borrowState: "대출가능",
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

  updateBookState(bookID, state, updatedContent) {
    this.bookStorage = this.bookStorage.map((book) => {
      if (book.id === bookID) {
        book[state] = updatedContent;
        return book;
      } else {
        return book;
      }
    });
    return this.bookStorage;
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
    if (book.borrowState === "대출가능") {
      const $borrowButton = this.makeElement("button", "borrow-button", "button");
      $borrowButton.innerText = "대출";
      this.$displayBook.append($borrowButton);
      return $borrowButton;
    }
  }
}

class LibraryManager {
  constructor(model, view, {$searchButton, $inputText, $bookTable, $displayContainer, $displayBook}) {
  this.model = model;
  this.view = view;
  this.$searchButton = $searchButton;
  this.$inputText = $inputText;
  this.$bookTable = $bookTable;
  this.$displayContainer = $displayContainer;
  this.$displayBook = $displayBook;
  }

  searchBook() {
    this.$searchButton.addEventListener("click", () => {
      const bookName = this.$inputText.value;
      let foundBookList = [];

      this.$displayContainer.textContent = "";
      this.$displayBook.classList.add("invisible");
      this.$displayContainer.classList.remove("invisible");
      this.model.bookStorage.forEach((book) => {
        if (book.name.includes(bookName)) {
          foundBookList.push(book);
          return;
        }
      });
      if (foundBookList.length === 0) {
        this.$displayContainer.textContent = "검색된 도서가 없습니다";
        return;
      } else {
        const $foundBookTable = this.view.displayBookTable(foundBookList);
        this.selectBook($foundBookTable);
        return;
      }
    });
  }

  selectBook($foundBookTable) {
    $foundBookTable.addEventListener("click", (event) => {
      event.preventDefault();
      const $tableRow = event.target.parentElement;
      const bookID = Number($tableRow.children[0].innerText);
      const selectedBook = this.model.pickBook(bookID);
      const $borrowButton = this.view.displaySelectedBook(selectedBook);
      if ($borrowButton) {
        $borrowButton.addEventListener("click", this.borrowBook.bind(this, event));
        return;
      }
    })
  }

  borrowBook(event) {
    const bookID = Number(event.target.parentElement.children[0].innerText);
    const borrowTerm = 1000 * 60 * 60 * 24 * 14;
    const returnDate = new Date(Date.now() + borrowTerm).toISOString().slice(0,10);
    this.model.updateBookState(bookID, "borrowState", "대출중");
    this.model.updateBookState(bookID, "returnDate", returnDate);
    const updatedBook = this.model.pickBook(bookID);
    console.log(updatedBook);
    this.$displayContainer.classList.toggle("invisible");
    this.$displayBook.classList.toggle("invisible");
    this.view.displaySelectedBook(updatedBook);
  }
}

//const data = require("./data.json");
const $displayContainer = document.querySelector(".display-container");
const $displayBook = document.querySelector(".display-book");
const $bookTable = document.querySelector(".book-table");
const $searchButton = document.querySelector(".search-button");
const $inputText = document.querySelector(".input-book-name");

const model = new LibraryModel(data);
const DOMgroup1 = {$bookTable, $displayContainer, $displayBook};
const view = new LibraryView(model, DOMgroup1);
const DOMgroup2 = {$searchButton, $inputText, $bookTable, $displayContainer, $displayBook};
const manager = new LibraryManager(model, view, DOMgroup2);
manager.searchBook();