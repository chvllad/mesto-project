import '../scss/index.scss';

import { openAddCard, openProfileEdit } from './modal.js';
import createCard from './card.js';
import { cardsList, initialCards } from './constatns.js';

// eslint-disable-next-line import/prefer-default-export
export const insertCard = (data) => {
  if (Array.isArray(data)) {
    data.reverse().forEach((el) => cardsList.prepend(el));
  } else {
    cardsList.prepend(data);
  }
};

insertCard(initialCards.map(createCard));

document.querySelector('.profile__edit').addEventListener('click', () => {
  openProfileEdit();
});

document.querySelector('.profile__add').addEventListener('click', () => {
  openAddCard();
});
