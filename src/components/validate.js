const createInputValidator = (inputEl, errorEl, errorMsgAttr) => {
  const checkValidity = (showError) => {
    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(inputEl.getAttribute(errorMsgAttr) || '');
    } else {
      inputEl.setCustomValidity('');
    }
    if (inputEl.validity.valid || !showError) {
      errorEl.textContent = '';
    } else {
      errorEl.textContent = inputEl.validationMessage;
    }
  };

  inputEl.addEventListener('input', () => {
    checkValidity(true);
  });

  checkValidity(false);

  return () => {
    checkValidity(false);
  };
};

export default (formEl, { inputsSelector, errorMsgAttr, errorElementSuffix }) => {
  const inputEls = formEl.querySelectorAll(inputsSelector);
  const validators = [...inputEls].map((inputEl) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}${errorElementSuffix}`);
    return createInputValidator(inputEl, errorEl, errorMsgAttr);
  });

  return () => {
    validators.forEach((val) => val());
  };
};
