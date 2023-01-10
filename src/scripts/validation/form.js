import InputValidator from './input.js';

export default class FormValidator {
  #validators;

  constructor(inputEls, errorEls) {
    this.#validators = inputEls.map((inputEl, idx) => new InputValidator(inputEl, errorEls[idx]));
  }

  reset() {
    this.#validators.forEach((val) => val.reset());
  }
}
