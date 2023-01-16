import createFormValidator from './validate.js';
import { createCard } from './card.js';
import { insertCard } from './utils.js';
import {
  ADD_CARD_POPUP_SEL,
  ESCAPE_KEY,
  IMAGE_VIEW_IMAGE_SEL,
  IMAGE_VIEW_POPUP_SEL,
  IMAGE_VIEW_SEL,
  IMAGE_VIEW_TITLE_SEL,
  KEYDOWN_EVENT_TYPE,
  LINK_FORM_EL_NAME,
  MOUSEDOWN_EVENT_TYPE,
  PLACE_NAME_FORM_EL_NAME,
  POPUP_ANIMATED_CLASS,
  POPUP_CLASS,
  POPUP_CLOSE_CLASS,
  POPUP_ERROR_EL_SUFFIX,
  POPUP_ERROR_MSG_ATTR,
  POPUP_FORM_INPUT_SEL,
  POPUP_FORM_SEL,
  POPUP_OPENED_CLASS,
  PROFILE_EDIT_POPUP_SEL,
  PROFILE_NAME_FORM_EL_NAME,
  PROFILE_NAME_SEL,
  PROFILE_STATUS_SEL,
  STATUS_FORM_EL_NAME,
  SUBMIT_EVENT_TYPE,
} from './constants.js';

/* Так как классы и наследование через прототипы функций запрещено использовать,
  используем ручную реализацию наследования через обычные объекты */

const popupPrototype = {
  construct(el) {
    this.popupEl = el;
    el.classList.add(POPUP_ANIMATED_CLASS);
  },
  show() {
    this.popupEl.classList.add(POPUP_OPENED_CLASS);
    document.addEventListener(KEYDOWN_EVENT_TYPE, this);
    this.popupEl.addEventListener(MOUSEDOWN_EVENT_TYPE, this);
  },
  hide() {
    this.popupEl.classList.remove(POPUP_OPENED_CLASS);
    document.removeEventListener(KEYDOWN_EVENT_TYPE, this);
    this.popupEl.removeEventListener(MOUSEDOWN_EVENT_TYPE, this);
  },
  handleEvent(e) {
    switch (e.type) {
      case KEYDOWN_EVENT_TYPE:
        if (e.key === ESCAPE_KEY) {
          e.preventDefault();
          this.hide();
        }
        break;
      case MOUSEDOWN_EVENT_TYPE: {
        const { target } = e;
        // eslint-disable-next-line max-len
        if (target.classList.contains(POPUP_CLASS) || target.classList.contains(POPUP_CLOSE_CLASS)) {
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
    popupPrototype.construct.call(this, document.querySelector(IMAGE_VIEW_POPUP_SEL));
    const imageViewEl = this.popupEl.querySelector(IMAGE_VIEW_SEL);
    this.titleEl = imageViewEl.querySelector(IMAGE_VIEW_TITLE_SEL);
    this.imageEl = imageViewEl.querySelector(IMAGE_VIEW_IMAGE_SEL);
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

    this.formEl = popupEl.querySelector(POPUP_FORM_SEL);
    this.validator = createFormValidator(this.formEl, {
      inputsSelector: POPUP_FORM_INPUT_SEL,
      errorElementSuffix: POPUP_ERROR_EL_SUFFIX,
      errorMsgAttr: POPUP_ERROR_MSG_ATTR,
    });

    this.formEl.addEventListener(SUBMIT_EVENT_TYPE, this);
  },
  handleEvent(e) {
    switch (e.type) {
      case SUBMIT_EVENT_TYPE:
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
    formPopupPrototype.construct.call(this, document.querySelector(ADD_CARD_POPUP_SEL));
  },
  onSubmit({ [PLACE_NAME_FORM_EL_NAME]: name, [LINK_FORM_EL_NAME]: link }) {
    insertCard(createCard({
      name: name.value,
      link: link.value,
    }));
  },
};

const profileEditPrototype = {
  __proto__: formPopupPrototype,
  construct() {
    formPopupPrototype.construct.call(this, document.querySelector(PROFILE_EDIT_POPUP_SEL));

    this.nameEl = document.querySelector(PROFILE_NAME_SEL);
    this.statusEl = document.querySelector(PROFILE_STATUS_SEL);
  },
  onSubmit({ [PROFILE_NAME_FORM_EL_NAME]: name, [STATUS_FORM_EL_NAME]: status }) {
    this.nameEl.textContent = name.value;
    this.statusEl.textContent = status.value;
  },
  onOpen({ [PROFILE_NAME_FORM_EL_NAME]: name, [STATUS_FORM_EL_NAME]: status }) {
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
