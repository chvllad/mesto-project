import FormValidator from './validate.js';
import { createCard, insertCard } from './card.js';

/* Так как классы запрещено использовать, используем наследование через прототипы */
function Popup(el) {
  this.popupEl = el;
  el.classList.add('popup_animated');
}

Popup.prototype.show = function showPopup() {
  this.popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', this);
  this.popupEl.addEventListener('mousedown', this);
};

Popup.prototype.hide = function hidePopup() {
  this.popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', this);
  this.popupEl.removeEventListener('mousedown', this);
};

Popup.prototype.handleEvent = function handlePopupEvent(e) {
  switch (e.type) {
    case 'keydown':
      if (e.key === 'Escape') {
        e.preventDefault();
        this.hide();
      }
      break;
    case 'mousedown': {
      const { target } = e;
      if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
        this.hide();
      }
      break;
    }
    default: break;
  }
};

function ImageViewer() {
  Popup.call(this, document.querySelector('.image-view-popup'));

  const imageViewEl = this.popupEl.querySelector('.image-view');
  this.titleEl = imageViewEl.querySelector('.image-view__title');
  this.imageEl = imageViewEl.querySelector('.image-view__image');
}
Object.setPrototypeOf(ImageViewer.prototype, Popup.prototype);

ImageViewer.prototype.open = function openImageViewer(title, url) {
  this.titleEl.textContent = title;
  this.imageEl.src = url;
  this.imageEl.alt = title;

  this.show();
};

function FormPopup(popupEl) {
  Popup.call(this, popupEl);

  this.formEl = popupEl.querySelector('.popup-form');
  this.validator = new FormValidator(this.formEl, {
    inputsSelector: '.popup-form__input',
    errorElementSuffix: '-error-message',
    errorMsgAttr: 'data-invalid-message',
  });

  this.formEl.addEventListener('submit', this);
}
Object.setPrototypeOf(FormPopup.prototype, Popup.prototype);

FormPopup.prototype.handleEvent = function handleFormPopupEvent(e) {
  switch (e.type) {
    case 'submit':
      e.preventDefault();

      if (!this.formEl.checkValidity()) {
        return;
      }

      this.onSubmit(this.formEl.elements);

      this.hide();
      break;
    default:
      Popup.prototype.handleEvent.call(this, e);
      break;
  }
};

FormPopup.prototype.open = function openFormPopup() {
  this.onOpen(this.formEl.elements);

  this.validator.reset();
  this.show();
};

FormPopup.prototype.onOpen = function defaultOnOpen() {
  this.formEl.reset();
};

function AddCard() {
  FormPopup.call(this, document.querySelector('.add-card-popup'));
}
Object.setPrototypeOf(AddCard.prototype, FormPopup.prototype);

AddCard.prototype.onSubmit = function addCardOnSubmit({ 'place-name': name, link }) {
  insertCard(createCard({
    name: name.value,
    link: link.value,
  }));
};

function ProfileEdit() {
  FormPopup.call(this, document.querySelector('.profile-edit-popup'));

  this.nameEl = document.querySelector('.profile__name');
  this.statusEl = document.querySelector('.profile__status');
}
Object.setPrototypeOf(ProfileEdit.prototype, FormPopup.prototype);

ProfileEdit.prototype.onSubmit = function profileEditOnSubmit({ 'profile-name': name, status }) {
  this.nameEl.textContent = name.value;
  this.statusEl.textContent = status.value;
};

ProfileEdit.prototype.onOpen = function profileEditOnOpen({ 'profile-name': name, status }) {
  name.value = this.nameEl.textContent;
  status.value = this.statusEl.textContent;
};

export { AddCard, ImageViewer, ProfileEdit };
