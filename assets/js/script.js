document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  const searchForm = document.getElementById("form-search");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
    submitForm.reset();
    displayAlert(alertSuccess);
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    refreshDataFromBooks();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", function () {
  console.log("Data berhasil disimpan");
  totalBooks();
});

document.addEventListener("ondataloaded", function () {
  refreshDataFromBooks();
  totalBooks();
});
