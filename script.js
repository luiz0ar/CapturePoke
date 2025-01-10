const firstNameInput = document.querySelector('.firstName');
const lastNameInput = document.querySelector('.lastName');
const countryCodeSelect = document.querySelector('.countryCode');
const phoneNumberInput = document.querySelector('.phoneNumber');
const submitButton = document.querySelector('.submit');
const contactsList = document.querySelector('.contactsList');
const messageDiv = document.querySelector('.message');
const removeSelectedBtn = document.querySelector('.removeSelectedBtn');
const cancelBtn = document.querySelector('.cancelBtn');
let contacts = [];
let isSelecting = false;

function addContact() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const countryCode = countryCodeSelect.value;
  const phoneNumber = phoneNumberInput.value;

  if (!firstName || !lastName || !phoneNumber) {
      alert("Please fill in all the fields.");
      return;
  }

  const phoneExists = contacts.some(contact => contact.phoneNumber === phoneNumber);
  if (phoneExists) {
      messageDiv.textContent = "Phone number already exists.";
      messageDiv.style.color = "red";
      return;
  }

  if(phoneNumber.length < 5 || phoneNumber.length > 15){
      messageDiv.textContent = "This phone is not valid.";
      messageDiv.style.color = "red";
      return;
  }

  const contact = {
      firstName: firstName,
      lastName: lastName,
      countryCode: countryCode,
      phoneNumber: phoneNumber,
  };

  contacts.push(contact);
  firstNameInput.value = '';
  lastNameInput.value = '';
  phoneNumberInput.value = '';
  messageDiv.textContent = '';

  renderContacts();
}

function renderContacts() {
  contactsList.innerHTML = '';
  contacts.sort((a, b) => {
    const nameA = a.firstName + ' ' + a.lastName;
    const nameB = b.firstName + ' ' + b.lastName;

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  contacts.forEach((contact, index) => {
      const listItem = document.createElement('li');
      
      if (isSelecting) {
          const checkBox = document.createElement('input');
          checkBox.type = 'checkbox';
          checkBox.className = 'selectContact';
          checkBox.dataset.index = index;
          listItem.appendChild(checkBox);
      }
      
      listItem.appendChild(document.createTextNode(`${contact.firstName} ${contact.lastName} (${contact.countryCode}) ${contact.phoneNumber}`));

      contactsList.appendChild(listItem);
  });

  if (contacts.length > 0) {
      removeSelectedBtn.style.display = 'inline-block';
  } else {
      removeSelectedBtn.style.display = 'none';
  }
}

function removeSelectedContacts() {
  if (!isSelecting) {
      isSelecting = true;
      removeSelectedBtn.textContent = "Remove Selected";
      cancelBtn.style.display = 'inline-block';
      renderContacts();
      return;
  }

  const selectedContacts = document.querySelectorAll('.selectContact:checked');
  const indicesToRemove = Array.from(selectedContacts).map(checkbox => parseInt(checkbox.dataset.index));

  if (indicesToRemove.length === 0) {
      alert("Nenhum contato selecionado.");
      return;
  }

  if (confirm(`Are you sure you want to remove ${indicesToRemove.length} contact(s)?`)) {
      contacts = contacts.filter((contact, index) => !indicesToRemove.includes(index));
      isSelecting = false;
      removeSelectedBtn.textContent = "Select Contacts";
      cancelBtn.style.display = 'none';
      renderContacts();
  }
}

function cancelSelection() {
  isSelecting = false;
  removeSelectedBtn.textContent = "Remove Contacts";
  cancelBtn.style.display = 'none';
  renderContacts();
}

submitButton.addEventListener('click', addContact);
removeSelectedBtn.addEventListener('click', removeSelectedContacts);
cancelBtn.addEventListener('click', cancelSelection);
