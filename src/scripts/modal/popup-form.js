import FormValidator from '../validation/form.js';
import { closePopup, showPopup } from './utils.js';

export default class PopupFormImpl {
  #popupEl;

  #validator;

  inputEls;

  constructor(popupEl) {
    this.#popupEl = popupEl;
    this.#popupEl.classList.add('popup_animated');

    const formEl = this.#popupEl.querySelector('.popup-form');
    this.inputEls = [...formEl.querySelectorAll('.popup-form__input')];
    const errorEls = [...formEl.querySelectorAll('.popup-form__error')];
    this.#validator = new FormValidator(this.inputEls, errorEls);

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!formEl.checkValidity()) {
        return;
      }

      this.onSubmit();

      closePopup(this.#popupEl);
    });
  }

  open() {
    this.onOpen();
    this.#validator.reset();
    showPopup(this.#popupEl);
  }
}
