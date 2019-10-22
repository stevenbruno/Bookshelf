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
  
  const titleData = document.createElement("td");
  const titleNode = document.createTextNode(`${recentBook.title}`);
  titleData.appendChild(titleNode);

  const authorData = document.createElement("td");
  const authorNode = document.createTextNode(`${recentBook.author}`);
  authorData.appendChild(authorNode);

  const pagesData = document.createElement("td");
  const pagesNode = document.createTextNode(`${recentBook.pages}`);
  pagesData.appendChild(pagesNode);

  const readData = document.createElement("td");
  const readNode = document.createTextNode(`${recentBook.read == true? 'yes' : 'no'}`);
  readData.appendChild(readNode);

  row.appendChild(titleData);
  row.appendChild(authorData);
  row.appendChild(pagesData);
  row.appendChild(readData);
  
  bookTable.appendChild(row);
}


document.getElementById("addBookButton").addEventListener("click", addBookToLibrary);
document.getElementById("addBookButton").addEventListener("click", clearForm);
document.getElementById("addBookButton").addEventListener("click", addBooktoShelf);