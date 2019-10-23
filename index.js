let myLibrary = [];

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const bookTable = document.getElementById("bookShelf");
const bookTableBody = document.getElementById("tableBody");

const firstBook = new Book('ExampleBook', 'Jane Doe', '300', true);
myLibrary.push(firstBook);

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
  
  const trash = createTrashElement();
  
  row.setAttribute("data-row", `${myLibrary.length - 1}`)
  row.appendChild(trash);

  bookTableBody.appendChild(row);
}

function createTrashElement() {
  const trash = document.createElement("td");
  const trashNode = document.createTextNode('X');
  trash.appendChild(trashNode);
  trash.classList.add("trash");
  trash.setAttribute("data-row", `${myLibrary.length}`)
  trash.addEventListener("click", removeBookFromShelf);
  trash.addEventListener("click", removeBookFromLibrary);
  // trash.addEventListener("click", updateDataAttributes);
  return trash;
}

function removeBookFromShelf() {
  const targetRow = event.target;
  bookTable.deleteRow(`${targetRow.dataset.row + 1}`)
}

function removeBookFromLibrary() {
  const targetRow = event.target;
  myLibrary.splice(`${targetRow.dataset.row}`, 1);
}

document.getElementById("addBookButton").addEventListener("click", addBookToLibrary);
document.getElementById("addBookButton").addEventListener("click", clearForm);
document.getElementById("addBookButton").addEventListener("click", addBooktoShelf);

const trashIcons = document.querySelectorAll("td.trash");
trashIcons.forEach( td => {
  td.addEventListener("click", removeBookFromShelf);
  td.addEventListener("click", removeBookFromLibrary);
  // td.addEventListener("click", updateDataAttributes);
});
