"use strict";
const booksContainer = document.getElementById("books-container");
const showForm = document.querySelector(".add-book");
const hideForm = document.querySelector(".close-btn");
const formContainer = document.getElementById("newbook-form");
const submitForm = document.getElementById("submit");

const inputTitle = document.getElementById("book-title");
const inputAuthor = document.getElementById("book-author");
const inputPages = document.getElementById("book-pages");

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

function clearFields() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
}

// add book to library from form input
function addBook() {
  //open form
  showForm.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
    booksContainer.classList.add("overlay");
  });

  submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    //validate form
    if (
      inputTitle.value === "" ||
      inputAuthor.value === "" ||
      inputPages.value === ""
    ) {
      alert("Please fill all the fields to add a new book👀");
      formContainer.classList.add("hidden");
      booksContainer.classList.remove("overlay");
      clearFields();
    } else {
      const title = inputTitle.value;
      const author = inputAuthor.value;
      const pages = inputPages.value;
      const bookstatus = document.querySelector(
        'input[name="bookstatus"]:checked'
      ).value;

      //create instances of Book
      const book = new Book(title, author, pages, bookstatus);

      //add instance to library
      myLibrary.push(book);

      //hide form after the form was submit
      formContainer.classList.add("hidden");
      booksContainer.classList.remove("overlay");

      displayBook();
      clearFields();
    }
  });
  //hide form after the form on close button
  hideForm.addEventListener("click", () => {
    formContainer.classList.add("hidden");
    booksContainer.classList.remove("overlay");
  });
}

//create book card from form input
function displayBook() {
  const body = document.getElementById("books-container");
  body.textContent = "";
  for (let book of myLibrary) {
    let bookCard = document.createElement("div");
    bookCard.className = "book-card";

    for (let attribute in book) {
      const infoBook = document.createElement("div");
      infoBook.setAttribute("class", attribute);
      if (attribute === "title") {
        infoBook.classList = "book-title";
        const h3 = document.createElement("h3");
        h3.textContent = `${book[attribute]}`;
        const hr = document.createElement("hr");
        infoBook.appendChild(h3);
        infoBook.appendChild(hr);
      } else if (attribute === "author") {
        infoBook.className = "book-author";
        infoBook.textContent = `${book[attribute]}`;
      } else if (attribute === "pages") {
        infoBook.className = "book-pages";
        infoBook.textContent = `${book[attribute]} pages`;
      } else if (attribute === "bookstatus") {
        const statusButton = document.createElement("button");
        statusButton.setAttribute("read", true);
        statusButton.className = "book-status";
        if (book[attribute]) {
          statusButton.textContent = "Read";
        } else {
          statusButton.setAttribute("read", false);
          statusButton.textContent = "Unread";
          bookCard.classList.add("unread");
        }
        infoBook.appendChild(statusButton);
      }
      bookCard.appendChild(infoBook);
    }

    const removeBtn = document.createElement("button");
    removeBtn.className = "delete-btn";
    removeBtn.textContent = "X";
    bookCard.appendChild(removeBtn);

    body.appendChild(bookCard);
  }
  toggleBookStatus();

  removeBook();
}

//toggle read/unread on click
function toggleBookStatus() {
  const cards = document.querySelectorAll(".book-card");
  const statusBtns = document.querySelectorAll(".book-status");

  statusBtns.forEach((statusBtn, index) => {
    statusBtn.addEventListener("click", (event) => {
      if (statusBtn.getAttribute("read") === "true") {
        myLibrary[index].bookstatus = false;
        statusBtn.setAttribute("read", "false");
        statusBtn.textContent = "Unread";

        cards.forEach((card, i) => {
          if (i === index) {
            card.classList.add("unread");
          }

          return card;
        });
      } else {
        myLibrary[index].bookstatus = true;
        statusBtn.setAttribute("read", "true");
        statusBtn.textContent = "Read";

        cards.forEach((card, i) => {
          if (i === index) {
            card.classList.remove("unread");
          }

          return card;
        });
      }
    });
  });
}

//remove book on delete btn
function removeBook() {
  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      let index = i;

      myLibrary.splice(index, 1);

      toggleBookStatus();
      displayBook();
    });
  });
}

addBook();

window.onload = () => {
  myLibrary.push(
    new Book(
      "Duty Free Art: Art in the Age of Planetary Civil War",
      "Hito Steyerl",
      304,
      "read"
    )
  );
  myLibrary.push(
    new Book(
      "Cyberpop: Digital Lifestyles and Commodity Culture",
      "Sidney Eve Matrix ",
      206,
      "unread"
    )
  );
  myLibrary.push(
    new Book(
      "Zeros and Ones: Digital Women and the New Technoculture",
      "Sadie Plant",
      320,
      "read"
    )
  );
  displayBook();
};
