// Some starter HTML element selectors

const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const button = document.getElementsByClassName("btn");
const itemList = document.querySelector("#item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

// Function to add items to shopping list

function addItem(content) {
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

function deleteItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
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

// Form Submit Event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "" || input.value === " ") {
    alert("Please add an item... This can't be empty");
  } else {
    addItem(input.value);
  }
  input.value = "";
});

// Delete Button & Clear Functionality logic
itemList.addEventListener("click", (e) => deleteItem(e));

clearBtn.addEventListener("click", () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
});

// Item filtering functionality ==>
itemFilter.addEventListener("input", (e) => filterItems(e));

// On document load check for empty list
checkUI();
