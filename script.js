const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const button = document.getElementsByClassName("btn");

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
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "" || input.value === " ") {
    alert("Please add an item... This can't be empty");
  } else {
    addItem(input.value);
  }
  input.value = "";
});
