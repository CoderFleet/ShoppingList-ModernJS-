// Some starter HTML element selectors

const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const button = document.getElementsByClassName("btn");
const itemList = document.querySelector("#item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

// Function to add items to shopping list

function displayItems() {
  const items = getItemsFromStorage();

  items.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function addItemToDOM(content) {
  const itemList = document.getElementById("item-list");

  const item = document.createElement("li");

  const itemContentText = document.createTextNode(content);

  const itemContentBtn = document.createElement("button");
  itemContentBtn.classList = "remove-item btn-link text-red";

  const itemContentBtnIcon = document.createElement("i");
  itemContentBtnIcon.classList = "fa-solid fa-xmark";

  itemContentBtn.appendChild(itemContentBtnIcon);
  item.appendChild(itemContentText);
  item.appendChild(itemContentBtn);

  itemList.appendChild(item);

  checkUI();
}

function addItemToStorage(content) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(content);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onAddItemSubmit(value) {
  addItemToDOM(value);
  addItemToStorage(value);
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    deleteItem(e.target.parentElement.parentElement);
  }
}

function deleteItem(item) {
  if (confirm("Are You Sure?")) {
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(itemText) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((item) => item !== itemText);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const enteredText = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(enteredText) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function init() {
  // Form Submit Event Listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value === "" || input.value === " ") {
      alert("Please add an item... This can't be empty");
    } else {
      onAddItemSubmit(input.value);
    }
    input.value = "";
  });

  // Delete Button & Clear Functionality logic
  itemList.addEventListener("click", (e) => onClickItem(e));

  clearBtn.addEventListener("click", () => {
    while (itemList.firstChild) {
      itemList.firstChild.remove();
      removeItemFromStorage(itemList.firstChild.textContent);
    }
    checkUI();
  });

  // Item filtering functionality ==>
  itemFilter.addEventListener("input", (e) => filterItems(e));

  // On document load check for empty list
  checkUI();

  document.addEventListener("DOMContentLoaded", displayItems);
}

init();
