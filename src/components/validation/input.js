export default class InputValidator {
  /** @type {HTMLElement} */
  #inputEl;
  /** @type {HTMLElement} */
  #errorEl;
  /** @type {string} */
  #errorMsgAttr;

  /**
   * Create an InputValidator.
   * @param {HTMLElement} inputEl - The input element to validate.
   * @param {HTMLElement} errorEl - The element to show validation errors.
   * @param {string} errorMsgAttr - The input element's attribute with pattern validation
   * message.
   */
  constructor(inputEl, errorEl, errorMsgAttr) {
    this.#inputEl = inputEl;
    this.#errorEl = errorEl;
    this.#errorMsgAttr = errorMsgAttr;
    inputEl.addEventListener('input', this);
    this.check(false);
  }

  /**
   * Event listener for 'input' event.
   * @private
   */
  handleEvent() {
    this.check(true);
  }

  /**
   * Reset input to the initial state (revalidate and hide any errors).
   * @public
   */
  reset() {
    this.check(false);
  }

  /**
   * Validate input.
   * @param {boolean} showError - show error in case of validation error.
   * @private
   */
  check(showError) {
    if (this.#inputEl.validity.patternMismatch) {
      this.#inputEl.setCustomValidity(this.#inputEl.getAttribute(this.#errorMsgAttr) || '');
    } else {
      this.#inputEl.setCustomValidity('');
    }
    if (this.#inputEl.validity.valid || !showError) {
      this.#errorEl.textContent = '';
    } else {
      this.#errorEl.textContent = this.#inputEl.validationMessage;
    }
  }
}
