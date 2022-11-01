import { EventBus } from './eventbus.js';

const setIsLiked = (likeEl, isLiked) => {
  if (isLiked) {
    likeEl.classList.add('place__like_active');
    likeEl.setAttribute('aria-pressed', 'true');
  } else {
    likeEl.classList.remove('place__like_active');
    likeEl.setAttribute('aria-pressed', 'false');
  }
};

const cardsList = document.querySelector('.places__list');

const createCard = ({ name, link }) => {
  const el = document.querySelector('#card-template').content.firstElementChild.cloneNode(true);

  const nameEl = el.querySelector('.place__name');
  nameEl.title = nameEl.textContent = name;

  let width = 1;
  let height = 1;

  const imgEl = el.querySelector('.place__img');
  imgEl.addEventListener('load', function loadImageCompleted() {
    imgEl.removeEventListener('load', loadImageCompleted);
    height = imgEl.naturalHeight;
    width = imgEl.naturalWidth;
  });
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

  imgEl.addEventListener('click', () => void EventBus.emit('popup', { type: 'image-show', url: link, title: name, width, height }));

  cardsList.append(el);
};

EventBus.register('create-card', createCard);
