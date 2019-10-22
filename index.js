let myLibrary = [];

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const bookTable = document.getElementById("bookShelf");


function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read? 'read' : 'not yet read'}`
  }
}


function addBookToLibrary() {
  const newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);  
}


function clearForm() {
  [title.value, author.value, pages.value, read.checked] =  ['', '', '', false];
}


function addBooktoShelf() {
  const row = document.createElement("tr");
  const recentBook = myLibrary[myLibrary.length - 1];

  for (var prop in recentBook) {
    if (prop == 'info') {
      continue;
    }

    const td = document.createElement("td");
    const node = document.createTextNode(`${recentBook[prop]}`);
    td.appendChild(node);
    console.log(td);
    row.appendChild(td);
  }

  bookTable.appendChild(row);
}


document.getElementById("addBookButton").addEventListener("click", addBookToLibrary);
document.getElementById("addBookButton").addEventListener("click", clearForm);
document.getElementById("addBookButton").addEventListener("click", addBooktoShelf);