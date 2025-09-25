// DOM Elements
const form = document.getElementById('grocery-form');
const input = document.getElementById('item');
const list = document.getElementById('grocery-list');

// Load saved list on page load
document.addEventListener('DOMContentLoaded', loadList);

// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const itemText = input.value.trim();
  if (itemText !== '') {
    addItem(itemText);
    saveItem(itemText);
    input.value = '';
  }
});

// Add item to the list
function addItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  deleteBtn.setAttribute('aria-label', `Remove ${text}`);
  deleteBtn.addEventListener('click', function () {
    li.remove();
    removeItem(text);
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Save item to localStorage
function saveItem(text) {
  let items = JSON.parse(localStorage.getItem('groceryList')) || [];
  const timestamp = new Date().toLocaleString();
  items.push({ text, timestamp });
  localStorage.setItem('groceryList', JSON.stringify(items));
}

// Remove item from localStorage
function removeItem(text) {
  let items = JSON.parse(localStorage.getItem('groceryList')) || [];
  items = items.filter(item => item !== text);
  localStorage.setItem('groceryList', JSON.stringify(items));
}

// Load items from localStorage
function loadList() {
  const items = JSON.parse(localStorage.getItem('groceryList')) || [];
  items.forEach(item => addItem(item));
}