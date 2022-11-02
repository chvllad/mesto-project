import { createCard, insertCard } from "./card.js";

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
};

const showPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
};

export const openImageView = (() => {
  const popupEl = document.querySelector('.image-view-popup');
  const imageViewEl = popupEl.querySelector('.image-view');
  const titleEl = imageViewEl.querySelector('.image-view__title');
  const imageEl = imageViewEl.querySelector('.image-view__image');

  return (title, url) => {
    titleEl.textContent = title;
    imageEl.src = url;
    imageEl.alt = title;

    showPopup(popupEl);
  };
})();

export const openProfileEdit = (() => {
  const popupEl = document.querySelector('.profile-edit-popup');
  const formEl = popupEl.querySelector('.popup-form');
  const inputEls = Array.from(formEl.querySelectorAll('.popup-form__input'));

  const nameEl = document.querySelector('.profile__name');
  const statusEl = document.querySelector('.profile__status');

  formEl.addEventListener('submit', e => {
    e.preventDefault();

    nameEl.textContent = inputEls[0].value;
    statusEl.textContent = inputEls[1].value;

    closePopup(popupEl);
  });

  return () => {
    inputEls[0].value = nameEl.textContent;
    inputEls[1].value = statusEl.textContent;
    showPopup(popupEl);
  };
})();

export const openAddCard = (() => {
  const popupEl = document.querySelector('.add-card-popup');
  const formEl = popupEl.querySelector('.popup-form');
  const inputEls = Array.from(formEl.querySelectorAll('.popup-form__input'));

  formEl.addEventListener('submit', e => {
    e.preventDefault();
    insertCard(createCard({
      name: inputEls[0].value,
      link: inputEls[1].value,
    }));

    closePopup(popupEl);
  });

  return () => {
    inputEls[0].value = inputEls[1].value = '';
    showPopup(popupEl);
  };
})();

document.querySelectorAll('.popup__close').forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('mousedown', () => closePopup(popup));
});
