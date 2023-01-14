import { ImageViewer } from './modal.js';

const templateEl = document.querySelector('#card-template').content.firstElementChild;
const cardsList = document.querySelector('.places__list');
const imageViewer = new ImageViewer();

export const createCard = ({ name, link }) => {
  const newCard = templateEl.cloneNode(true);

  const nameEl = newCard.querySelector('.place__name');
  nameEl.title = name;
  nameEl.textContent = name;

  const imgEl = newCard.querySelector('.place__img');
  imgEl.src = link;
  imgEl.title = name;
  imgEl.alt = name;

  const removeEl = newCard.querySelector('.place__remove');

  const likeEl = newCard.querySelector('.place__like');

  likeEl.addEventListener('click', ({ target }) => {
    target.classList.toggle('place__like_active');
  });

  removeEl.addEventListener('click', () => newCard.remove());

  imgEl.addEventListener('click', () => imageViewer.open(name, link));

  return newCard;
};

export const insertCard = (data) => {
  if (Array.isArray(data)) {
    data.reverse().forEach((el) => cardsList.prepend(el));
  } else {
    cardsList.prepend(data);
  }
};
