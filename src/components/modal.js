import createFormValidator from './validate.js';
import { createCard } from './card.js';
import { insertCard } from './utils.js';

/* Так как классы и наследование через прототипы функций запрещено использовать,
  используем ручную реализацию наследования через обычные объекты */

const popupPrototype = {
  construct(el) {
    this.popupEl = el;
    el.classList.add('popup_animated');
  },
  show() {
    this.popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this);
    this.popupEl.addEventListener('mousedown', this);
  },
  hide() {
    this.popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', this);
    this.popupEl.removeEventListener('mousedown', this);
  },
  handleEvent(e) {
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
  },
};

const imageViewerPrototype = {
  __proto__: popupPrototype,
  construct() {
    popupPrototype.construct.call(this, document.querySelector('.image-view-popup'));
    const imageViewEl = this.popupEl.querySelector('.image-view');
    this.titleEl = imageViewEl.querySelector('.image-view__title');
    this.imageEl = imageViewEl.querySelector('.image-view__image');
  },
  open(title, url) {
    this.titleEl.textContent = title;
    this.imageEl.src = url;
    this.imageEl.alt = title;

    this.show();
  },
};

const formPopupPrototype = {
  __proto__: popupPrototype,
  construct(popupEl) {
    popupPrototype.construct.call(this, popupEl);

    this.formEl = popupEl.querySelector('.popup-form');
    this.validator = createFormValidator(this.formEl, {
      inputsSelector: '.popup-form__input',
      errorElementSuffix: '-error-message',
      errorMsgAttr: 'data-invalid-message',
    });

    this.formEl.addEventListener('submit', this);
  },
  handleEvent(e) {
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
        popupPrototype.handleEvent.call(this, e);
        break;
    }
  },
  open() {
    this.onOpen(this.formEl.elements);

    this.validator.reset();
    this.show();
  },
  onOpen() {
    this.formEl.reset();
  },
};

const addCardPrototype = {
  __proto__: formPopupPrototype,
  construct() {
    formPopupPrototype.construct.call(this, document.querySelector('.add-card-popup'));
  },
  onSubmit({ 'place-name': name, link }) {
    insertCard(createCard({
      name: name.value,
      link: link.value,
    }));
  },
};

const profileEditPrototype = {
  __proto__: formPopupPrototype,
  construct() {
    formPopupPrototype.construct.call(this, document.querySelector('.profile-edit-popup'));

    this.nameEl = document.querySelector('.profile__name');
    this.statusEl = document.querySelector('.profile__status');
  },
  onSubmit({ 'profile-name': name, status }) {
    this.nameEl.textContent = name.value;
    this.statusEl.textContent = status.value;
  },
  onOpen({ 'profile-name': name, status }) {
    name.value = this.nameEl.textContent;
    status.value = this.statusEl.textContent;
  },
};

const createObject = (prototype) => {
  const rv = Object.create(prototype);
  rv.construct();
  return rv;
};

export const AddCard = createObject(addCardPrototype);
export const ImageViewer = createObject(imageViewerPrototype);
export const ProfileEdit = createObject(profileEditPrototype);
