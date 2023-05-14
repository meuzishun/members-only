const validateInput = function (e) {
  const elem = e.target;
  const inputContainer = elem.parentElement;
  const helpMsg = inputContainer.querySelector('.help');
  if (elem.checkValidity()) {
    inputContainer.classList.remove('invalid');
    helpMsg.textContent = '';
    elem.removeEventListener('input', validateInput);
    return;
  } else {
    helpMsg.textContent = elem.validationMessage;
    return;
  }
};

const validateForm = function (e) {
  const form = e.target;
  const password = form.querySelector('#password');
  const confirmPassword = form.querySelector('#confirm-password');

  if (form.checkValidity()) {
    if (password.value !== confirmPassword.value) {
      const helpMsg = confirmPassword.parentElement.querySelector('.help');
      helpMsg.textContent = 'Passwords must match';
      confirmPassword.parentElement.classList.add('invalid');
      e.preventDefault();
    }
    console.log('form is good');
  } else {
    e.preventDefault();
    console.log('form is bad');
    Array.from(form.elements).forEach((elem) => {
      if (elem.type === 'submit') {
        return;
      }
      const inputContainer = elem.parentElement;
      const helpMsg = inputContainer.querySelector('.help');
      if (elem.checkValidity()) {
        inputContainer.classList.remove('invalid');
        helpMsg.textContent = '';
        return;
      } else {
        inputContainer.classList.add('invalid');
        helpMsg.textContent = elem.validationMessage;
        elem.addEventListener('input', validateInput);
        return;
      }
    });
  }
};

const form = document.querySelector('.form');
if (form) {
  form.noValidate = true;
  form.addEventListener('submit', validateForm);
}
