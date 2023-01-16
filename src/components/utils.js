import { PLACES_LIST_SEL } from './constants.js';

const cardsList = document.querySelector(PLACES_LIST_SEL);

// eslint-disable-next-line import/prefer-default-export
export const insertCard = (data) => {
  if (Array.isArray(data)) {
    data.reverse().forEach((el) => cardsList.prepend(el));
  } else {
    cardsList.prepend(data);
  }
};
