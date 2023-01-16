import '../scss/index.scss';

import { AddCard, ProfileEdit } from './modal.js';
import { createCard } from './card.js';
import {
  CLICK_EVENT_TYPE,
  initialCards,
  PROFILE_ADD_SEL,
  PROFILE_EDIT_SEL,
} from './constants.js';
import { insertCard } from './utils.js';

insertCard(initialCards.map(createCard));

document.querySelector(PROFILE_EDIT_SEL).addEventListener(CLICK_EVENT_TYPE, () => {
  ProfileEdit.open();
});

document.querySelector(PROFILE_ADD_SEL).addEventListener(CLICK_EVENT_TYPE, () => {
  AddCard.open();
});
