/**
 * Prompt helper module.
 * @module modal/prompt
 */

import Popup from './popup.js';

/** Prompt helper */
class Prompt extends Popup {
  /** @type {Promise<boolean>} */
  #resolveFunc = null;
  /** @type {HTMLElement} */
  #titleEl;
  /** @type {HTMLElement} */
  #buttonEl;

  /**
   * Create a Prompt helper.
   */
  constructor() {
    super(document.querySelector('.prompt-popup'));
    const promptEl = this.popupEl.querySelector('.popup-prompt-container');
    this.#titleEl = promptEl.querySelector('.popup-prompt-container__title');
    this.#buttonEl = promptEl.querySelector('.popup-prompt-container__button');
    this.#buttonEl.addEventListener('click', () => {
      this.#resolvePromise(true);
      this.hide();
    });
  }

  /**
   * Resolve user resolution promise.
   * @param {boolean} isAgreed - user resolution about request.
   */
  #resolvePromise(isAgreed) {
    if (this.#resolveFunc) {
      this.#resolveFunc(isAgreed);
      this.#resolveFunc = null;
    }
  }

  /**
   * Runs after popup was hidden.
   * @protected
   */
  onHide() {
    this.#resolvePromise(false);
  }

  /**
   * Open the popup.
   * @param {string} titleText - Prompt title.
   * @param {string} buttonText - Prompt button's text.
   * @returns {Promise<boolean>} Promise which fulfills to true if user
   * approved request or to false otherwise
   * @public
   */
  open(titleText, buttonText) {
    this.#resolvePromise(false);
    this.#titleEl.textContent = titleText;
    this.#buttonEl.textContent = buttonText;
    this.show();
    return new Promise((res) => {
      this.#resolveFunc = res;
    });
  }
}

export default Prompt;
