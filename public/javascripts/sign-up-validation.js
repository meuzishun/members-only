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
        return;
      }
    });
  }
};

const signUpForm = document.querySelector('.sign-up-form');
if (signUpForm) {
  signUpForm.noValidate = true;
  signUpForm.addEventListener('submit', validateForm);
}

const signInForm = document.querySelector('.sign-in-form');
if (signInForm) {
  signInForm.noValidate = true;
  signInForm.addEventListener('submit', validateForm);
}
