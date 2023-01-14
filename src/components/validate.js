/* Так как классы запрещено использовать, используем наследование через прототипы */
function InputValidator(inputEl, errorEl, errorMsgAttr) {
  this.inputEl = inputEl;
  this.errorEl = errorEl;
  this.errorMsgAttr = errorMsgAttr;

  inputEl.addEventListener('input', this);
  this.check(false);
}

InputValidator.prototype.handleEvent = function handleChangeEvent() {
  this.check(true);
};

InputValidator.prototype.reset = function resetValidator() {
  this.check(false);
};

InputValidator.prototype.check = function checkInput(showError) {
  if (this.inputEl.validity.patternMismatch) {
    this.inputEl.setCustomValidity(this.inputEl.getAttribute(this.errorMsgAttr) || '');
  } else {
    this.inputEl.setCustomValidity('');
  }
  if (this.inputEl.validity.valid || !showError) {
    this.errorEl.textContent = '';
  } else {
    this.errorEl.textContent = this.inputEl.validationMessage;
  }
};

function FormValidator(formEl, { inputsSelector, errorMsgAttr, errorElementSuffix }) {
  const inputEls = formEl.querySelectorAll(inputsSelector);
  this.validators = [...inputEls].map((inputEl) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}${errorElementSuffix}`);
    return new InputValidator(inputEl, errorEl, errorMsgAttr);
  });
}

FormValidator.prototype.reset = function resetValidators() {
  this.validators.forEach((val) => val.reset());
};

export default FormValidator;
