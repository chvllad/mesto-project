/* Все строки во всех файлах. Зачем это делать - не знаю, но раз ревьювер хочет...
*/
// card.js
export const CARD_TEMPLATE_SEL = '#card-template';
export const PLACE_NAME_SEL = '.place__name';
export const PLACE_IMG_SEL = '.place__img';
export const PLACE_REMOVE_SEL = '.place__remove';
export const PLACE_LIKE_SEL = '.place__like';
export const CLICK_EVENT_TYPE = 'click';
export const PLACE_LIKE_ACTIVE_CLASS = 'place__like_active';

// constants.js
const ARHYZ_NAME = 'Архыз';
const ARHYZ_LINK = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
const CHEL_NAME = 'Челябинская область';
const CHEL_LINK = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg';
const IVAN_NAME = 'Иваново';
const IVAN_LINK = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg';
const KAMCH_NAME = 'Камчатка';
const KAMCH_LINK = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg';
const HOLM_NAME = 'Холмогорский район';
const HOLM_LINK = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg';
const BUYKAL_NAME = 'Байкал';
const BUYKAL_LINK = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg';

// index.js
export const PROFILE_EDIT_SEL = '.profile__edit';
export const PROFILE_ADD_SEL = '.profile__add';

// modal.js
export const POPUP_ANIMATED_CLASS = 'popup_animated';
export const POPUP_OPENED_CLASS = 'popup_opened';
export const KEYDOWN_EVENT_TYPE = 'keydown';
export const MOUSEDOWN_EVENT_TYPE = 'mousedown';
export const ESCAPE_KEY = 'Escape';
export const POPUP_CLASS = 'popup';
export const POPUP_CLOSE_CLASS = 'popup__close';
export const IMAGE_VIEW_POPUP_SEL = '.image-view-popup';
export const IMAGE_VIEW_SEL = '.image-view';
export const IMAGE_VIEW_TITLE_SEL = '.image-view__title';
export const IMAGE_VIEW_IMAGE_SEL = '.image-view__image';
export const POPUP_FORM_SEL = '.popup-form';
export const POPUP_FORM_INPUT_SEL = '.popup-form__input';
export const POPUP_ERROR_EL_SUFFIX = '-error-message';
export const POPUP_ERROR_MSG_ATTR = 'data-invalid-message';
export const SUBMIT_EVENT_TYPE = 'submit';
export const ADD_CARD_POPUP_SEL = '.add-card-popup';
export const PLACE_NAME_FORM_EL_NAME = 'place-name';
export const LINK_FORM_EL_NAME = 'link';
export const PROFILE_EDIT_POPUP_SEL = '.profile-edit-popup';
export const PROFILE_NAME_SEL = '.profile__name';
export const PROFILE_STATUS_SEL = '.profile__status';
export const PROFILE_NAME_FORM_EL_NAME = 'profile-name';
export const STATUS_FORM_EL_NAME = 'status';

// utils.js
export const PLACES_LIST_SEL = '.places__list';

// validate.js
export const EMPTY_STRING = '';
export const INPUT_EVENT_TYPE = 'input';
export const DOT = '.';

// eslint-disable-next-line import/prefer-default-export
export const initialCards = [
  {
    name: ARHYZ_NAME,
    link: ARHYZ_LINK,
  },
  {
    name: CHEL_NAME,
    link: CHEL_LINK,
  },
  {
    name: IVAN_NAME,
    link: IVAN_LINK,
  },
  {
    name: KAMCH_NAME,
    link: KAMCH_LINK,
  },
  {
    name: HOLM_NAME,
    link: HOLM_LINK,
  },
  {
    name: BUYKAL_NAME,
    link: BUYKAL_LINK,
  },
];
