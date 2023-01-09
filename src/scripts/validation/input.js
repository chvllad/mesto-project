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
    const { validity } = this.#inputEl;
    this.isValid = validity.valid;
    if (this.isValid) {
      this.#errorEl.textContent = '';
      return;
    }
    if (validity.patternMismatch) {
      this.#inputEl.setCustomValidity('Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.');
    } else {
      this.#inputEl.setCustomValidity('');
    }
    this.#errorEl.textContent = this.#inputEl.validationMessage;
  }
}
