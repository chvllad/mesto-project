import { openImageView } from './modal.js';

const templateEl = document.querySelector('#card-template').content.firstElementChild;

export default ({ name, link }) => {
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

  imgEl.addEventListener('click', () => openImageView(name, link));

  return newCard;
};
