// DOM Elements
const historyList = document.getElementById('history-list');
const clearBtn = document.getElementById('clear-history');
const exportBtn = document.getElementById('export-csv');

// Load saved items on page load
document.addEventListener('DOMContentLoaded', loadHistory);

// Load and display saved grocery items with timestamps
function loadHistory() {
  const items = JSON.parse(localStorage.getItem('groceryList')) || [];

  if (items.length === 0) {
    historyList.innerHTML = '<li>No saved items found.</li>';
    return;
  }

  items.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${entry.text}</strong> <em>(${entry.timestamp})</em>`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.setAttribute('aria-label', `Remove ${entry.text}`);
    deleteBtn.addEventListener('click', function () {
      removeItem(entry.text);
      li.remove();
    });

    li.appendChild(deleteBtn);
    historyList.appendChild(li);
  });
}

// Remove item from localStorage
function removeItem(text) {
  let items = JSON.parse(localStorage.getItem('groceryList')) || [];
  items = items.filter(entry => entry.text !== text);
  localStorage.setItem('groceryList', JSON.stringify(items));
}

// Clear all history
clearBtn.addEventListener('click', function () {
  localStorage.removeItem('groceryList');
  historyList.innerHTML = '<li>History cleared.</li>';
});

// Export to CSV
exportBtn.addEventListener('click', function () {
  const items = JSON.parse(localStorage.getItem('groceryList')) || [];
  if (items.length === 0) return;

  let csvContent = "Item,Timestamp\n";
  items.forEach(entry => {
    csvContent += `"${entry.text}","${entry.timestamp}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'grocery_history.csv';
  link.click();
});