export default class InputValidator {
  #inputEl;

  #errorEl;

  isValid;

  constructor(inputEl, errorEl) {
    this.#inputEl = inputEl;
    this.#errorEl = errorEl;

    this.reset();

    inputEl.addEventListener('input', this);
  }

  reset() {
    this.isValid = this.#inputEl.checkValidity();
    this.#errorEl.textContent = '';
  }

  handleEvent() {
    if (this.#inputEl.validity.patternMismatch) {
      this.#inputEl.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.');
    } else {
      this.#inputEl.setCustomValidity('');
    }
    this.isValid = this.#inputEl.validity.valid;
    if (this.isValid) {
      this.#errorEl.textContent = '';
      return;
    }
    this.#errorEl.textContent = this.#inputEl.validationMessage;
  }
}
