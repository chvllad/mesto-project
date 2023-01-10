let currentPopup = null;
let handleKeyDown = null;

export const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
  currentPopup = null;
  document.removeEventListener('keydown', handleKeyDown);
};

export const showPopup = (popupEl) => {
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
