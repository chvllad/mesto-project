export default class InputValidator {
  #inputEl;

  #errorEl;

  constructor(inputEl, errorEl) {
    this.#inputEl = inputEl;
    this.#errorEl = errorEl;

    this.reset();

    inputEl.addEventListener('input', this);
  }

  reset() {
    this.#errorEl.textContent = '';
  }

  handleEvent() {
    if (this.#inputEl.validity.patternMismatch) {
      this.#inputEl.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.');
    } else {
      this.#inputEl.setCustomValidity('');
    }
    if (this.#inputEl.validity.valid) {
      this.#errorEl.textContent = '';
    } else {
      this.#errorEl.textContent = this.#inputEl.validationMessage;
    }
  }
}
