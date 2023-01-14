import '../scss/index.scss';

import { AddCard, ProfileEdit } from './modal.js';
import { createCard, insertCard } from './card.js';
import { initialCards } from './constants.js';

const addCard = new AddCard();
const profileEdit = new ProfileEdit();

insertCard(initialCards.map(createCard));

document.querySelector('.profile__edit').addEventListener('click', () => {
  profileEdit.open();
});

document.querySelector('.profile__add').addEventListener('click', () => {
  addCard.open();
});
