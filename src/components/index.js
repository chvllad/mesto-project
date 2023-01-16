import '../scss/index.scss';

import AddCard from './modal/add-card.js';
import ProfileEdit from './modal/profile-edit.js';
import { createCard } from './card.js';
import {
  CLICK_EVENT_TYPE,
  initialCards,
  PROFILE_ADD_SEL,
  PROFILE_EDIT_SEL,
} from './constants.js';
import { insertCard } from './utils.js';

const addCard = new AddCard();
const profileEdit = new ProfileEdit();

insertCard(initialCards.map(createCard));

document.querySelector(PROFILE_EDIT_SEL).addEventListener(CLICK_EVENT_TYPE, () => {
  profileEdit.open();
});

document.querySelector(PROFILE_ADD_SEL).addEventListener(CLICK_EVENT_TYPE, () => {
  addCard.open();
});
