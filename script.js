let data; // Declare 'data' as a global variable

document.addEventListener('DOMContentLoaded', function () {
  fetch('person-list.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData.personList; // Assign 'personList' from JSON data to the global variable 'data'
      const personList = document.getElementById('person-list');
      updatePersonList(personList, data);
    })
    .catch(error => {
      console.error('Veri çekilemedi:', error);
    });
});

function updatePersonList(personList, data) {
  const filterInput = document.getElementById('filter').value.toLowerCase();

  personList.innerHTML = '';

  const filteredData = data.filter(item => {
    const fullName = `${item.ad} ${item.soyad}`.toLowerCase();
    return fullName.includes(filterInput);
  });

  if (filteredData.length === 0) {
    // Display error message
    const listItem = document.createElement('li');
    listItem.textContent = 'Aradığınız kriterlere uygun kişi bulunamadı.';
    personList.appendChild(listItem);
  } else {
    filteredData.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('person');
      listItem.innerHTML = `
        <strong>${item.ad} ${item.soyad}</strong>
        <br>
        Telefon: ${item.telefon}
        <br>
        Email: ${item.email}
        <button class="delete-btn" onclick="deletePerson(this)">Sil</button>
      `;
      personList.appendChild(listItem);
    });
  }
}


function deletePerson(button) {
  const listItem = button.parentElement;
  listItem.remove();
}

function filterList() {
  const personList = document.getElementById('person-list');
  updatePersonList(personList, data); 
}
