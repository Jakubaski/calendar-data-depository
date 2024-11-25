const form = document.getElementById('data-form');
const tableBody = document.querySelector('#data-table tbody');
const chartCanvas = document.getElementById('annotation-chart');
let dataEntries = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    archiveCity: document.getElementById('archive-city').value,
    signature: document.getElementById('signature').value,
    skrzynka: document.getElementById('skrzynka').value,
    karta: document.getElementById('karta').value,
    vols: document.getElementById('vols').value,
    year: document.getElementById('year').value,
    name: document.getElementById('name').value,
    author: document.getElementById('author').value,
    printingLocation: document.getElementById('printing-location').value,
    annotations: document.getElementById('annotations').value,
    annotationCategory: document.getElementById('annotation-category').value,
    photos: document.getElementById('photos').value,
    seen: document.getElementById('seen').value,
    online: document.getElementById('online').value,
  };

  dataEntries.push(formData);
  updateTable();
  form.reset();
});

function updateTable() {
  tableBody.innerHTML = '';
  dataEntries.forEach((entry) => {
    const row = document.createElement('tr');
    for (const key in entry) {
      const cell = document.createElement('td');
      cell.textContent = entry[key];
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  });
}
