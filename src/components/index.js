import '../scss/index.scss';

import { AddCard, ProfileEdit } from './modal.js';
import { createCard } from './card.js';
import { initialCards } from './constants.js';
import { insertCard } from './utils.js';

insertCard(initialCards.map(createCard));

document.querySelector('.profile__edit').addEventListener('click', () => {
  ProfileEdit.open();
});

document.querySelector('.profile__add').addEventListener('click', () => {
  AddCard.open();
});
