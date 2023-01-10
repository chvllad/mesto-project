import createFormValidator from './validate.js';
import { createCard, insertCard } from './card.js';

let currentPopup = null;
let handleKeyDown = null;

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
  currentPopup = null;
  document.removeEventListener('keydown', handleKeyDown);
};

const showPopup = (popupEl) => {
  if (currentPopup) {
    closePopup(currentPopup);
  }
  popupEl.classList.add('popup_opened');
  currentPopup = popupEl;
  document.addEventListener('keydown', handleKeyDown);
};

handleKeyDown = (e) => {
  if (currentPopup && e.key === 'Escape') {
    e.preventDefault();
    closePopup(currentPopup);
  }
};

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', ({ target }) => {
    if (target.classList.contains('popup')) {
      closePopup(target);
    } else if (target.classList.contains('popup__close')) {
      closePopup(target.closest('.popup'));
    }
  });
});

const createImageView = () => {
  const popupEl = document.querySelector('.image-view-popup');
  popupEl.classList.add('popup_animated');
  const imageViewEl = popupEl.querySelector('.image-view');
  const titleEl = imageViewEl.querySelector('.image-view__title');
  const imageEl = imageViewEl.querySelector('.image-view__image');

  return (title, url) => {
    titleEl.textContent = title;
    imageEl.src = url;
    imageEl.alt = title;

    showPopup(popupEl);
  };
};

export const openImageView = createImageView();

const createPopupForm = (popupEl, onSubmit) => {
  popupEl.classList.add('popup_animated');

  const formEl = popupEl.querySelector('.popup-form');
  const inputEls = [...formEl.querySelectorAll('.popup-form__input')];
  const errorEls = [...formEl.querySelectorAll('.popup-form__error')];
  const resetValidator = createFormValidator(inputEls, errorEls);

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!formEl.checkValidity()) {
      return;
    }

    onSubmit(inputEls);

    closePopup(popupEl);
  });

  return (openFn) => {
    openFn(inputEls);

    resetValidator();
    showPopup(popupEl);
  };
};

const createAddCard = () => {
  const onSubmit = (inputEls) => {
    insertCard(createCard({
      name: inputEls[0].value,
      link: inputEls[1].value,
    }));
  };
  const openForm = createPopupForm(document.querySelector('.add-card-popup'), onSubmit);

  return () => {
    openForm((inputEls) => {
      inputEls[0].value = '';
      inputEls[1].value = '';
    });
  };
};

export const openAddCard = createAddCard();

const createProfileEdit = () => {
  const nameEl = document.querySelector('.profile__name');
  const statusEl = document.querySelector('.profile__status');

  const onSubmit = (inputEls) => {
    nameEl.textContent = inputEls[0].value;
    statusEl.textContent = inputEls[1].value;
  };
  const openForm = createPopupForm(document.querySelector('.profile-edit-popup'), onSubmit);

  return () => {
    openForm((inputEls) => {
      inputEls[0].value = nameEl.textContent;
      inputEls[1].value = statusEl.textContent;
    });
  };
};

export const openProfileEdit = createProfileEdit();
