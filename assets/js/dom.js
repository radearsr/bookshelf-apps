const UNCOMPLETED_READ = "unread";
const COMPLETED_READ = "already-read";
const BOOK_ITEMID = "itemId";

function addBook() {
  const uncompletedRead = document.getElementById(UNCOMPLETED_READ);
  const completed_book_read = document.getElementById(COMPLETED_READ);

  const titleBook = document.getElementById("book-name").value;
  const authorBook = document.getElementById("author").value;
  const dateBook = document.getElementById("year").value;
  const statusBook = document.getElementById("checkbtn");

  if (statusBook.checked == true) {
    const book = makeBookList(titleBook, authorBook, dateBook, true);
    const bookObject = composeBookObject(titleBook, authorBook, dateBook, true);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    completed_book_read.append(book);
    updateDataStorage();
  } else {
    const book = makeBookList(titleBook, authorBook, dateBook, false);
    const bookObject = composeBookObject(
      titleBook,
      authorBook,
      dateBook,
      false
    );

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedRead.append(book);
    updateDataStorage();
  }
}

function makeBookList(title, author, year, isCompleted) {
  const coverImg = document.createElement("img");

  if (isCompleted) {
    coverImg.setAttribute("src", "assets/img/selesai dibaca.png");
  } else {
    coverImg.setAttribute("src", "assets/img/belum dibaca.png");
  }

  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");

  thumbnail.append(coverImg);

  const titleBook = document.createElement("h3");
  titleBook.innerText = title;

  const authorBook = document.createElement("p");
  authorBook.innerText = author;

  const dateBook = document.createElement("p");
  dateBook.classList.add("date");
  dateBook.innerText = year;

  const details = document.createElement("div");
  details.classList.add("details");
  details.append(titleBook, authorBook, dateBook);

  const container = document.createElement("div");
  container.classList.add("child-content-item");

  if (isCompleted) {
    container.append(thumbnail, details, createUndoBtn(), createRemBtn());
  } else {
    container.append(thumbnail, details, createDoneBtn(), createRemBtn());
  }

  return container;
}

function addBookToCompleted(bookElement) {
  const completed_book_read = document.getElementById(COMPLETED_READ);

  const titleBook = bookElement.querySelector(".details > h3").innerText;
  const authorBook = bookElement.querySelector(".details > p").innerText;
  const dateBook = bookElement.querySelector(".details > .date").innerText;

  const newBook = makeBookList(titleBook, authorBook, dateBook, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  completed_book_read.append(newBook);
  bookElement.remove();

  updateDataStorage();
}

function removeBook(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataStorage();
  totalBooks();
  overlayConfirmDel.classList.remove("display-confirm");
  buttonYes.remove();
}

function getDataRemove(bookElement) {
  const titleBook = bookElement.querySelector(".details > h3").innerText;
  const authorBook = bookElement.querySelector(".details > p").innerText;
  const dateBook = bookElement.querySelector(".details > .date").innerText;

  const titleDel = document.getElementById("del-title");
  const authorDel = document.getElementById("del-author");
  const yearDel = document.getElementById("del-year");

  titleDel.innerText = titleBook;
  authorDel.innerText = authorBook;
  yearDel.innerText = dateBook;

  const elementPopup = document.getElementById("popup-btn");
  elementPopup.appendChild(createDoneRemoveBtn(bookElement));

  overlayConfirmDel.classList.add("display-confirm");
  buttonYes = document.querySelector(".button-group > .btn-done");
}

function undoBookFromCompleted(bookElement) {
  const uncompleted_book_read = document.getElementById(UNCOMPLETED_READ);

  const titleBook = bookElement.querySelector(".details > h3").innerText;
  const authorBook = bookElement.querySelector(".details > p").innerText;
  const dateBook = bookElement.querySelector(".details > .date").innerText;

  const newBook = makeBookList(titleBook, authorBook, dateBook, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  uncompleted_book_read.append(newBook);
  bookElement.remove();
  updateDataStorage();
  totalBooks();
}

function createButton(buttonClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonClass);

  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function createDoneBtn() {
  return createButton("btn-done", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function createRemBtn() {
  return createButton("btn-remove", function (event) {
    getDataRemove(event.target.parentElement);
  });
}

function createDoneRemoveBtn(parentElement) {
  return createButton("btn-done", function () {
    removeBook(parentElement);
  });
}

function createUndoBtn() {
  return createButton("btn-undo", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
}
