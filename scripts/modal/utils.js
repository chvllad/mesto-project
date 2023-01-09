let currentPopup = null;

export const closePopup = (popupEl) => {
  popupEl.classList.remove('popup_opened');
  currentPopup = null;
};

export const showPopup = (popupEl) => {
  if (currentPopup) {
    closePopup(currentPopup);
  }
  popupEl.classList.add('popup_opened');
  currentPopup = popupEl;
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

document.addEventListener('keydown', (e) => {
  if (!currentPopup || e.key !== 'Escape') {
    return;
  }
  e.preventDefault();
  closePopup(currentPopup);
});
