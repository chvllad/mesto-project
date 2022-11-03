import { createCard, insertCard } from "./card.js";

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
};

const showPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
};

class ImageViewImpl {
  constructor() {
    this._popupEl = document.querySelector('.image-view-popup');
    this._imageViewEl = this._popupEl.querySelector('.image-view');
    this._titleEl = this._imageViewEl.querySelector('.image-view__title');
    this._imageEl = this._imageViewEl.querySelector('.image-view__image');
  }

  open(title, url) {
    this._titleEl.textContent = title;
    this._imageEl.src = url;
    this._imageEl.alt = title;

    showPopup(this._popupEl);
  }
}

const imageView = new ImageViewImpl();
export const openImageView = (...args) => imageView.open(...args);

class PopupFormImpl {
  #popupEl;
  _inputEls;

  constructor(popupEl) {
    this.#popupEl = popupEl;
    const formEl = this.#popupEl.querySelector('.popup-form');
    this._inputEls = Array.from(formEl.querySelectorAll('.popup-form__input'));

    formEl.addEventListener('submit', e => {
      e.preventDefault();

      this._onSubmit();

      closePopup(this.#popupEl);
    });
  }

  open() {
    this._onOpen();
    showPopup(this.#popupEl);
  }
}

class ProfileEditImpl extends PopupFormImpl {
  #nameEl;
  #statusEl;

  constructor() {
    super(document.querySelector('.profile-edit-popup'));

    this.#nameEl = document.querySelector('.profile__name');
    this.#statusEl = document.querySelector('.profile__status');
  }

  _onSubmit() {
    this.#nameEl.textContent = this._inputEls[0].value;
    this.#statusEl.textContent = this._inputEls[1].value;
  }

  _onOpen() {
    this._inputEls[0].value = this.#nameEl.textContent;
    this._inputEls[1].value = this.#statusEl.textContent;
  }
}

const profileEdit = new ProfileEditImpl();
export const openProfileEdit = () => profileEdit.open();

class AddCardImpl extends PopupFormImpl {
  constructor() {
    super(document.querySelector('.add-card-popup'));
  }

  _onSubmit() {
    insertCard(createCard({
      name: this._inputEls[0].value,
      link: this._inputEls[1].value,
    }));
  }

  _onOpen() {
    this._inputEls[0].value = this._inputEls[1].value = '';
  }
}

const addCard = new AddCardImpl();
export const openAddCard = () => addCard.open();

document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('mousedown', () => closePopup(popup));
});
