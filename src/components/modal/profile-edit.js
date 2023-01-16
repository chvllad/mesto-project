import FormPopup from './form-popup.js';

/** ProfileEdit helper */
export default class ProfileEdit extends FormPopup {
  /** @type {HTMLElement} */
  #nameEl;
  /** @type {HTMLElement} */
  #statusEl;

  /**
   * Create a ProfileEdit helper.
   */
  constructor() {
    super(document.querySelector('.profile-edit-popup'));

    this.#nameEl = document.querySelector('.profile__name');
    this.#statusEl = document.querySelector('.profile__status');
  }

  /**
   * Function called before opening.
   * @param {HTMLFormControlsCollection} _elements - Form elements.
   * @protected
   */
  onOpen({ 'profile-name': name, status }) {
    name.value = this.#nameEl.textContent;
    status.value = this.#statusEl.textContent;
  }

  /**
   * Function called after submit
   * @param {HTMLFormControlsCollection} elements - Form elements.
   * @override
   * @protected
   */
  onSubmit({ 'profile-name': name, status }) {
    this.#nameEl.textContent = name.value;
    this.#statusEl.textContent = status.value;
  }
}
