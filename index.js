document.addEventListener('DOMContentLoaded', displayEntries);

function displayEntries() {
  const entriesContainer = document.getElementById('entries');
  entriesContainer.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const entry = JSON.parse(localStorage.getItem(key));

    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    entryDiv.innerHTML = `
      <div class="entry-actions">
        <button onclick="editEntry('${key}')">Edit</button>
        <button onclick="deleteEntry('${key}')">Delete</button>
      </div>
      <p><strong>Date:</strong> ${entry.date}</p>
      <p><strong>Content:</strong> ${entry.content}</p>
    `;

    entriesContainer.appendChild(entryDiv);
  }
}

function openEntryForm() {
  document.getElementById('entryForm').style.display = 'block';
  document.getElementById('formTitle').innerText = 'Add New Entry';
}

function closeEntryForm() {
  document.getElementById('entryForm').style.display = 'none';
  document.getElementById('entryDate').value = '';
  document.getElementById('entryContent').value = '';
}

function saveEntry(event) {
  event.preventDefault();

  const entryDate = document.getElementById('entryDate').value;
  const entryContent = document.getElementById('entryContent').value;

  const entry = {
    date: entryDate,
    content: entryContent,
  };

  const entryKey = `entry_${Date.now()}`;
  localStorage.setItem(entryKey, JSON.stringify(entry));

  displayEntries();
  closeEntryForm();
}

function editEntry(key) {
  const entry = JSON.parse(localStorage.getItem(key));

  document.getElementById('entryDate').value = entry.date;
  document.getElementById('entryContent').value = entry.content;

  document.getElementById('formTitle').innerText = 'Edit Entry';
  document.getElementById('entryForm').style.display = 'block';

  // Remove the existing entry
  localStorage.removeItem(key);
  displayEntries();
}

function deleteEntry(key) {
  if (confirm('Are you sure you want to delete this entry?')) {
    localStorage.removeItem(key);
    displayEntries();
  }
}
