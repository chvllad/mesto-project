import Popup from './popup.js';
import FormValidator from '../validation/form.js';

/**
 * @typedef {import('../validation/form.js').FormValidatorConfig} FormValidatorConfig
 */

/** @type {FormValidatorConfig} */
const defaultValidatorParams = {
  inputsSelector: '.popup-form__input',
  errorElementSuffix: '-error-message',
  errorMsgAttr: 'data-invalid-message',
};

/** FormPopup helper */
export default class FormPopup extends Popup {
  /** @type {HTMLFormElement} */
  #formEl;
  #validator;

  /**
   * Create a FormPopup helper.
   * @param {HTMLElement} popupEl - The popup element.
   * @param {object?} config - FormPopup configuration.
   * @param {FormValidatorConfig} config.validator - Validator configuration.
   */
  constructor(popupEl, { validator: valParams } = { validator: defaultValidatorParams }) {
    super(popupEl);
    this.#formEl = popupEl.querySelector('.popup-form');
    this.#validator = new FormValidator(this.#formEl, valParams);

    this.#formEl.addEventListener('submit', this);
  }

  /**
   * Event listener.
   * @param {Event} e - event element.
   * @private
   * @override
   */
  handleEvent(e) {
    switch (e.type) {
      case 'submit':
        e.preventDefault();

        if (!this.#formEl.checkValidity()) {
          return;
        }

        this.onSubmit(this.#formEl.elements);

        this.hide();
        break;
      default:
        super.handleEvent(e);
        break;
    }
  }

  /**
   * Open the popup.
   * @public
   */
  open() {
    this.onOpen(this.#formEl.elements);

    this.#validator.reset();
    this.show();
  }

  /**
   * Function called before opening.
   * @param {HTMLFormControlsCollection} _elements - Form elements.
   * @protected
   */
  onOpen(_elements) {
    this.#formEl.reset();
  }

  /**
   * Function called after submit
   * @param {HTMLFormControlsCollection} _elements - Form elements.
   * @abstract
   * @protected
   */
  onSubmit(_elements) {
    throw new Error('must be implemented by subclass!');
  }
}
