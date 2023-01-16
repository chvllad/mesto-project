/* Так как классы и наследование через прототипы функций запрещено использовать,
  используем ручную реализацию наследования через обычные объекты */

const inputValidatorPrototype = {
  handleEvent() {
    this.check(true);
  },
  reset() {
    this.check(false);
  },
  check(showError) {
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
  },
};

function createInputValidator(inputEl, errorEl, errorMsgAttr) {
  const rv = Object.create(inputValidatorPrototype, {
    inputEl: { value: inputEl },
    errorEl: { value: errorEl },
    errorMsgAttr: { value: errorMsgAttr },
  });

  inputEl.addEventListener('input', rv);
  rv.check(false);
  return rv;
}

const formValidatorPrototype = {
  reset() {
    this.validators.forEach((val) => val.reset());
  },
};

function createFormValidator(formEl, { inputsSelector, errorMsgAttr, errorElementSuffix }) {
  const inputEls = formEl.querySelectorAll(inputsSelector);
  const validators = [...inputEls].map((inputEl) => {
    const errorEl = formEl.querySelector(`.${inputEl.id}${errorElementSuffix}`);
    return createInputValidator(inputEl, errorEl, errorMsgAttr);
  });
  return Object.create(formValidatorPrototype, {
    validators: { value: validators },
  });
}

export default createFormValidator;
