export default class InputValidator {
  #inputEl;

  #errorEl;

  constructor(inputEl, errorEl) {
    this.#inputEl = inputEl;
    this.#errorEl = errorEl;

    inputEl.addEventListener('input', this);

    this.checkValidity();
  }

  checkValidity() {
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

  handleEvent() {
    this.checkValidity();
  }
}
