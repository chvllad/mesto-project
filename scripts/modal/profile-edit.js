import PopupFormImpl from './popup-form.js';

class ProfileEditImpl extends PopupFormImpl {
  #nameEl;

  #statusEl;

  constructor() {
    super(document.querySelector('.profile-edit-popup'));

    this.#nameEl = document.querySelector('.profile__name');
    this.#statusEl = document.querySelector('.profile__status');
  }

  onSubmit() {
    this.#nameEl.textContent = this.inputEls[0].value;
    this.#statusEl.textContent = this.inputEls[1].value;
  }

  onOpen() {
    this.inputEls[0].value = this.#nameEl.textContent;
    this.inputEls[1].value = this.#statusEl.textContent;
  }
}

const profileEdit = new ProfileEditImpl();
export default () => profileEdit.open();
