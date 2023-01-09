import InputValidator from './input.js';

export default class FormValidator {
  #validators;

  constructor(inputEls, errorEls) {
    this.#validators = inputEls.map((inputEl, idx) => new InputValidator(inputEl, errorEls[idx]));
  }

  get isValid() {
    return this.#validators.every((val) => val.isValid);
  }

  reset() {
    this.#validators.forEach((val) => val.reset());
  }
}
