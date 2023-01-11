import createFormValidator from './validate.js';
import createCard from './card.js';
// "не относится к инициализации карточки", хмм. Ну, импорт из index тоже вариант :D
import { insertCard } from './index.js';

const KEY_ESCAPE = 'Escape';

const closePopup = (el) => {
  /*
    Довольно забавный способ закрыть попап через синтез события keydown. Необходим чтобы
    выполнить требования ревьювера чтобы переменную handleKeyDown в которой содержится
    функция для события keydown сделать константой. Теперь отсутствует циклическая зависимость
    между функциями, а значит можно предварительно не объявлять handleKeyDown со значением null.
  */
  el.dispatchEvent(new KeyboardEvent('keydown', {
    bubbles: true,
    key: KEY_ESCAPE,
  }));
};

const handleMouseDown = ({ target }) => {
  if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
    closePopup(target);
  }
};

const handleKeyDown = (e) => {
  if (e.key === KEY_ESCAPE) {
    e.preventDefault();
    const popupEl = e.target.closest('.popup');
    popupEl.classList.remove('popup_opened');
    popupEl.removeEventListener('keydown', handleKeyDown);
    popupEl.removeEventListener('mousedown', handleMouseDown);
  }
};

const showPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
  popupEl.addEventListener('keydown', handleKeyDown);
  popupEl.addEventListener('mousedown', handleMouseDown);
  // Попап не будет получать события клавиатуры, если не в фокусе,
  // к сожалению накладывать события на документ нельзя
  // (согласно предыдущему ревью), потому придётся ждать
  // примерного окончания анимации и фокусировать попап
  setTimeout(() => {
    popupEl.focus();
  }, 500);
};

const createImageViewOpener = () => {
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

export const openImageView = createImageViewOpener();

const createPopupFormHelper = (popupEl, onSubmit) => {
  popupEl.classList.add('popup_animated');

  const formEl = popupEl.querySelector('.popup-form');
  const resetValidator = createFormValidator(formEl, {
    inputsSelector: '.popup-form__input',
    errorElementSuffix: '-error-message',
    errorMsgAttr: 'data-invalid-message',
  });

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!formEl.checkValidity()) {
      return;
    }

    onSubmit(formEl.elements);

    closePopup(popupEl);
  });

  return {
    openForm(openFn) {
      if (openFn) {
        openFn(formEl.elements);
      } else {
        formEl.reset();
      }

      resetValidator();
      showPopup(popupEl);
    },
  };
};

const createAddCard = () => {
  const onSubmit = ({ 'place-name': name, link }) => {
    insertCard(createCard({
      name: name.value,
      link: link.value,
    }));
  };
  const { openForm } = createPopupFormHelper(document.querySelector('.add-card-popup'), onSubmit);

  return {
    open() {
      openForm();
    },
  };
};

export const openAddCard = createAddCard().open;

const createProfileEdit = () => {
  const nameEl = document.querySelector('.profile__name');
  const statusEl = document.querySelector('.profile__status');

  const onSubmit = ({ 'profile-name': name, status }) => {
    nameEl.textContent = name.value;
    statusEl.textContent = status.value;
  };
  const { openForm } = createPopupFormHelper(document.querySelector('.profile-edit-popup'), onSubmit);

  return {
    open() {
      openForm(({ 'profile-name': name, status }) => {
        name.value = nameEl.textContent;
        status.value = statusEl.textContent;
      });
    },
  };
};

export const openProfileEdit = createProfileEdit().open;
