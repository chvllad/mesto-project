import { openImageView } from "./popup.js";

const setIsLiked = (likeEl, isLiked) => {
  if (isLiked) {
    likeEl.classList.add('place__like_active');
    likeEl.setAttribute('aria-pressed', 'true');
  } else {
    likeEl.classList.remove('place__like_active');
    likeEl.setAttribute('aria-pressed', 'false');
  }
};

export const createCard = ({ name, link }) => {
  const el = document.querySelector('#card-template').content.firstElementChild.cloneNode(true);

  const nameEl = el.querySelector('.place__name');
  nameEl.title = nameEl.textContent = name;

  const imgEl = el.querySelector('.place__img');
  imgEl.src = link;
  imgEl.title = imgEl.alt = name;

  const removeEl = el.querySelector('.place__remove');

  const likeEl = el.querySelector('.place__like');

  let isLiked = false;
  setIsLiked(likeEl, isLiked);
  likeEl.addEventListener('click', () => {
    isLiked = !isLiked;
    setIsLiked(likeEl, isLiked);
  });

  removeEl.addEventListener('click', () => void el.remove());

  imgEl.addEventListener('click', () => void openImageView(name, link));

  return el;
};

const cardsList = document.querySelector('.places__list');

export const insertCard = (data) => {
  if (Array.isArray(data)) {
    data.reverse().forEach(el => cardsList.prepend(el));
  } else {
    cardsList.prepend(data);
  }
};
