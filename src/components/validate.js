const createInputValidator = (inputEl, errorEl) => {
  let isModified = false;

  const checkValidity = () => {
    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(inputEl.getAttribute('data-invalid-message') || '');
    } else {
      inputEl.setCustomValidity('');
    }
    if (inputEl.validity.valid || (!isModified && inputEl.value === '')) {
      errorEl.textContent = '';
    } else {
      errorEl.textContent = inputEl.validationMessage;
    }
  };

  inputEl.addEventListener('input', () => {
    isModified = true;
    checkValidity();
  });

  checkValidity();

  return () => {
    isModified = false;
    checkValidity();
  };
};

export default (inputEls, errorEls) => {
  const validators = inputEls.map((inputEl, idx) => createInputValidator(inputEl, errorEls[idx]));

  return () => {
    validators.forEach((val) => val());
  };
};
