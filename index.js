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
    if (prop === 'info') {
      continue;
    }
    const td = document.createElement("td");
    if (prop === 'read') {
      td.classList.add('read');
      td.addEventListener("click", toggleShelfReadStatus);
      td.addEventListener("click", toggleLibraryReadStatus);
    }
    const node = document.createTextNode(`${recentBook[prop]}`);
    td.appendChild(node);
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
  trash.setAttribute("data-row", `${myLibrary.length - 1}`)
  trash.addEventListener("click", removeBookFromShelf);
  trash.addEventListener("click", removeBookFromLibrary);
  trash.addEventListener("click", updateDataAttributes);
  return trash;
}

function removeBookFromShelf() {
  const targetRow = event.target;
  if (!targetRow.parentNode.nextSibling) {
    bookTable.deleteRow(-1);
    return;
  }
  bookTable.deleteRow(parseInt(targetRow.dataset.row, 10) + 1)
}

function removeBookFromLibrary() {
  const targetRow = event.target;
  myLibrary.splice(parseInt(targetRow.dataset.row, 10), 1);
}

function updateDataAttributes() {
  const targetRow = event.target;
  const allRows = document.querySelectorAll('tr[data-row]');
  allRows.forEach((row) => {
    if (parseInt(row.dataset.row, 10) <= parseInt(targetRow.dataset.row, 10)) {
      return;
    } 
    row.dataset.row = (parseInt(row.dataset.row, 10) - 1).toString();
    const td = row.querySelectorAll('td[data-row]');
    td[0].dataset.row = row.dataset.row;
  })
}

function toggleShelfReadStatus() {
  const td = event.target;
  if (td.innerHTML === 'true') {
    td.innerHTML = 'false';
    return;
  }
  td.innerHTML = 'true';
}

function toggleLibraryReadStatus() {
  const td = event.target;
  const index = td.parentNode.dataset.row;
  const libraryObj = myLibrary[index];
  if (libraryObj.read === true) {
    libraryObj.read = false;
    return;
  }
  libraryObj.read = true;
}

document.getElementById("addBookButton").addEventListener("click", addBookToLibrary);
document.getElementById("addBookButton").addEventListener("click", clearForm);
document.getElementById("addBookButton").addEventListener("click", addBooktoShelf);

const trashIcons = document.querySelectorAll("td.trash");
trashIcons.forEach( td => {
  td.addEventListener("click", removeBookFromShelf);
  td.addEventListener("click", removeBookFromLibrary);
  td.addEventListener("click", updateDataAttributes);
});

const readStatuses = document.querySelectorAll("td.read");
readStatuses.forEach( td => {
  td.addEventListener("click", toggleShelfReadStatus);
  td.addEventListener("click", toggleLibraryReadStatus);
});