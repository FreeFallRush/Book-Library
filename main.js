"use strict";

const showForm = document.querySelector(".add-book");
const hideForm = document.querySelector(".close-btn");
const formContainer = document.getElementById("newbook-form");
const submitForm = document.getElementById("submit");

function openForm() {
  formContainer.classList.remove("hidden");
  booksContainer.classList.add("overlay");
}

function closeForm() {
  formContainer.classList.add("hidden");
  booksContainer.classList.remove("overlay");
}

showForm.addEventListener("click", () => {
  openForm();
});

hideForm.addEventListener("click", () => {
  closeForm();
});
