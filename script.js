const firstNameInput = document.querySelector('.firstName');
const lastNameInput = document.querySelector('.lastName');
const countryCodeSelect = document.querySelector('.countryCode');
const phoneNumberInput = document.querySelector('.phoneNumber');
const submitButton = document.querySelector('.submit');
const contactsList = document.querySelector('.contactsList');
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
  renderContacts();
}

function renderContacts() {
  contactsList.innerHTML = '';
  contacts.forEach(contact => {
      const listItem = document.createElement('li');
      listItem.textContent = `${contact.firstName} ${contact.lastName} (${contact.countryCode})${contact.phoneNumber}`;
      contactsList.appendChild(listItem);
  });
}
submitButton.addEventListener('click', addContact);