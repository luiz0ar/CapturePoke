const firstNameInput = document.querySelector('.firstName');
const lastNameInput = document.querySelector('.lastName');
const countryCodeSelect = document.querySelector('.countryCode');
const phoneNumberInput = document.querySelector('.phoneNumber');
const submitButton = document.querySelector('.submit');
const contactsList = document.querySelector('.contactsList');
const messageDiv = document.querySelector('.message'); // Adicionando um espaço para exibir a mensagem de erro
let contacts = [];

function addContact() {
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const countryCode = countryCodeSelect.value;
  const phoneNumber = phoneNumberInput.value;

  if (!firstName || !lastName || !phoneNumber) {
      alert("Por favor, preencha todos os campos.");
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
  contacts.forEach(contact => {
      const listItem = document.createElement('li');
      listItem.textContent = `${contact.firstName} ${contact.lastName} (${contact.countryCode}) ${contact.phoneNumber}`;
      contactsList.appendChild(listItem);
  });
}

submitButton.addEventListener('click', addContact);
