const STORAGE_KEY = "BOOK_APPS";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data != null) {
    books = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) {
      return book;
    }
  }

  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (let book of books) {
    if (book.id === bookId) {
      return index;
    }

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_READ);
  const listCompleted = document.getElementById(COMPLETED_READ);
  const keyword = document.getElementById("search-value").value;

  if (keyword !== null || keyword !== "") {
    searchData(keyword, listCompleted, listUncompleted);
  } else {
    for (const book of books) {
      const newBook = makeBookList(
        book.title,
        book.author,
        book.year,
        book.isCompleted
      );

      newBook[BOOK_ITEMID] = book.id;

      if (book.isCompleted) {
        listCompleted.append(newBook);
      } else {
        listUncompleted.append(newBook);
      }
    }
  }
}

function searchData(keyword, complete, uncomplete) {
  const elementNoMatchs = document.querySelectorAll(".child-content-item");
  for (elementNoMatch of elementNoMatchs) {
    console.log("Mulai Menghapus");
    elementNoMatch.remove();
  }

  for (const book of books) {
    const titleBook = book.title.toLowerCase();
    const newKeyword = keyword.toLowerCase();

    if (titleBook.includes(newKeyword)) {
      const newBook = makeBookList(
        book.title,
        book.author,
        book.year,
        book.isCompleted
      );
      newBook[BOOK_ITEMID] = book.id;

      if (book.isCompleted) {
        complete.append(newBook);
      } else {
        uncomplete.append(newBook);
      }
    }
  }
}

function countBooks(request) {
  let totalCompleted = 0;
  let totalUncompleted = 0;

  if (request == "totalbook") {
    const totalBook = books.length;
    return totalBook;
  } else if (request == "bookCompleted") {
    for (let book of books) {
      if (book.isCompleted == true) {
        totalCompleted += 1;
      }
    }
    return totalCompleted;
  } else {
    for (let book of books) {
      if (book.isCompleted == false) {
        totalUncompleted += 1;
      }
    }
    return totalUncompleted;
  }
}

function totalBooks() {
  const allBooks = document.getElementById("total-all-books");
  const booksCompleted = document.getElementById("total-completed");
  const booksUncompleted = document.getElementById("total-uncompleted");

  allBooks.innerText = countBooks("totalbook");
  booksCompleted.innerText = countBooks("bookCompleted");
  booksUncompleted.innerText = countBooks(false);
}
