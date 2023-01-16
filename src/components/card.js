import { ImageViewer } from './modal.js';
import {
  CARD_TEMPLATE_SEL,
  CLICK_EVENT_TYPE,
  PLACE_IMG_SEL,
  PLACE_LIKE_ACTIVE_CLASS,
  PLACE_LIKE_SEL,
  PLACE_NAME_SEL,
  PLACE_REMOVE_SEL,
} from './constants.js';

const templateEl = document.querySelector(CARD_TEMPLATE_SEL).content.firstElementChild;

// eslint-disable-next-line import/prefer-default-export
export const createCard = ({ name, link }) => {
  const newCard = templateEl.cloneNode(true);

  const nameEl = newCard.querySelector(PLACE_NAME_SEL);
  nameEl.title = name;
  nameEl.textContent = name;

  const imgEl = newCard.querySelector(PLACE_IMG_SEL);
  imgEl.src = link;
  imgEl.title = name;
  imgEl.alt = name;

  const removeEl = newCard.querySelector(PLACE_REMOVE_SEL);

  const likeEl = newCard.querySelector(PLACE_LIKE_SEL);

  likeEl.addEventListener(CLICK_EVENT_TYPE, ({ target }) => {
    target.classList.toggle(PLACE_LIKE_ACTIVE_CLASS);
  });

  removeEl.addEventListener(CLICK_EVENT_TYPE, () => newCard.remove());

  imgEl.addEventListener(CLICK_EVENT_TYPE, () => ImageViewer.open(name, link));

  return newCard;
};
