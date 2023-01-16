import InputValidator from './input.js';

/**
 * @typedef FormValidatorConfig
 * @property {string} inputsSelector - Selector to get inputs for validation
 * @property {string} errorElementSuffix - Suffix used in combination with input's id to search
 * for element to show input's errors.
 * @property {string} errorMsgAttr - The input element's attribute with pattern validation
 * message.
 */

export default class FormValidator {
  /** @type {InputValidator[]} */
  #validators;

  /**
   * Create a FormValidator.
   * @param {HTMLElement} formEl - The form element.
   * @param {FormValidatorConfig} config - FormValidator configuration.
   */
  constructor(formEl, { inputsSelector, errorMsgAttr, errorElementSuffix }) {
    const inputEls = formEl.querySelectorAll(inputsSelector);
    this.#validators = [...inputEls].map((inputEl) => {
      const errorEl = formEl.querySelector(`.${inputEl.id}${errorElementSuffix}`);
      return new InputValidator(inputEl, errorEl, errorMsgAttr);
    });
  }

  /**
   * Reset all inputs to the initial state (revalidate and hide any errors).
   * @public
   */
  reset() {
    this.#validators.forEach((val) => val.reset());
  }
}
