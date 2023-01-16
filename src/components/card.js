import { ImageViewer } from './modal.js';

const templateEl = document.querySelector('#card-template').content.firstElementChild;

/* Из-за циклической зависимости в импортах (index.js -> modal.js -> card.js -> modal.js)
  нельзя использовать ImageViewer при инициализации модуля, а вынести ImageViewer в
  отдельный файл для избавления от циклической зависимости запрещено ревьювером
*/
const getImageViewer = () => ImageViewer;

// eslint-disable-next-line import/prefer-default-export
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

  imgEl.addEventListener('click', () => getImageViewer().open(name, link));

  return newCard;
};
