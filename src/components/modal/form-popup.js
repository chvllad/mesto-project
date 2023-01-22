/**
 * Popup with form helper module.
 * @module modal/form-popup
 */

import Popup from './popup.js';
import FormValidator from '../validation/form.js';

/**
 * @typedef {import('../validation/form.js').FormValidatorConfig} FormValidatorConfig
 */

/**
 * @type {FormValidatorConfig}
 * @private
 */
const defaultValidatorParams = {
  inputsSelector: '.popup-form__input',
  errorElementSuffix: '-error-message',
  errorMsgAttr: 'data-invalid-message',
};

/** FormPopup helper */
class FormPopup extends Popup {
  /** @type {HTMLElement} */
  #containerEl;
  /** @type {HTMLFormElement} */
  #formEl;
  /** @type {HTMLElement} */
  #submitEl;
  /** @type {HTMLElement} */
  #submitErrorEl;
  /** @type {FormValidator} */
  #validator;

  /**
   * Create a FormPopup helper.
   * @param {HTMLElement} popupEl - The popup element.
   * @param {object?} config - FormPopup configuration.
   * @param {FormValidatorConfig} config.validator - Validator configuration.
   */
  constructor(popupEl, { validator: valParams } = { validator: defaultValidatorParams }) {
    super(popupEl);
    this.#containerEl = popupEl.querySelector('.popup__container');
    this.#formEl = popupEl.querySelector('.popup-form');
    this.#submitEl = this.#formEl.querySelector('.popup-submit');
    this.#submitErrorEl = this.#formEl.querySelector('.submit-error-message');
    this.#validator = new FormValidator(this.#formEl, valParams);

    this.#formEl.addEventListener('submit', this);
  }

  /**
   * Event listener.
   * @param {Event} e - event element.
   * @private
   * @override
   */
  async handleEvent(e) {
    switch (e.type) {
      case 'submit': {
        e.preventDefault();

        if (!this.#formEl.checkValidity()) {
          return;
        }

        const submitText = this.#submitEl.textContent;
        try {
          this.#submitEl.textContent = 'Сохранение...';
          await this.onSubmit(this.#formEl.elements);
          this.hide();
        } catch (error) {
          this.#submitErrorEl.textContent = error.message;
        } finally {
          this.#submitEl.textContent = submitText;
        }
        break;
      }
      default:
        super.handleEvent(e);
        break;
    }
  }

  /**
   * Open the popup.
   * @public
   */
  async open() {
    this.#containerEl.removeAttribute('data-load-error');
    this.#containerEl.classList.add('element-loading');
    this.show();
    try {
      await this.onOpen(this.#formEl.elements);
      this.#validator.reset();
      this.#containerEl.classList.remove('element-loading');
    } catch (e) {
      this.#containerEl.setAttribute('data-load-error', e.message.replace('"', ''));
    }
  }

  /**
   * Function called before open.
   * @param {HTMLFormControlsCollection} _elements - Form elements.
   * @protected
   */
  async onOpen(_elements) {
    this.#formEl.reset();
    this.#submitErrorEl.textContent = '';
  }

  /**
   * Function called after submit.
   * @param {HTMLFormControlsCollection} _elements - Form elements.
   * @abstract
   * @protected
   */
  async onSubmit(_elements) {
    throw new Error('must be implemented by subclass!');
  }
}

export default FormPopup;
