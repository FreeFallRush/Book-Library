"use strict";
const booksContainer = document.getElementById("books-container");
const showForm = document.querySelector(".add-book");
const hideForm = document.querySelector(".close-btn");
const formContainer = document.getElementById("newbook-form");
const submitForm = document.getElementById("submit");

const myLibrary = [];

//Book constructor function
function Book(title, author, pages, bookstatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.bookstatus = bookstatus;
  if (bookstatus === "read") this.bookstatus = true;
  else this.bookstatus = false;
}

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
