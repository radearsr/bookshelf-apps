const overlayFormInput = document.getElementById("popup-input");
const overlayConfirmDel = document.getElementById("popup-confirm");
const buttonAdd = document.querySelector(".btn-add");
const buttonClose = document.querySelector(".close");
const buttonCancel = document.getElementById("button-cancel");
let buttonYes = null;
const buttonToTop = document.getElementById("back-to-top");
const alertSuccess = document.getElementById("add-success");

buttonAdd.addEventListener("click", function () {
  overlayFormInput.classList.add("display");
});

buttonClose.addEventListener("click", function () {
  overlayFormInput.classList.remove("display");
});

buttonCancel.addEventListener("click", function () {
  overlayConfirmDel.classList.remove("display-confirm");
  buttonYes.remove();
});

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    buttonToTop.style.display = "block";
  } else {
    buttonToTop.style.display = "none";
  }
};

buttonToTop.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

function displayAlert(alertElement) {
  alertElement.style.display = "block";
  setTimeout(function () {
    alertElement.style.display = "none";
  }, 3000);
}
