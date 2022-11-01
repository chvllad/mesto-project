import { EventBus } from './eventbus.js';

let onClose = null;

const closePopup = (popupEl) => {
  onClose?.call();
  onClose = null;

  popupEl.addEventListener('animationend', function animationEnd() {
    popupEl.removeAttribute('style');
    popupEl.classList.remove('popup_opened');
    popupEl.removeEventListener('animationend', animationEnd);
  });
  popupEl.setAttribute('style', 'animation: .2s ease-in both popup-close;');
};

const showPopup = (popupEl) => {
  popupEl.classList.add('popup_opened');
};

const openImageView = (() => {
  const popupEl = document.querySelector('.image-view-popup');
  const imageViewEl = popupEl.querySelector('.image-view');
  const titleEl = imageViewEl.querySelector('.image-view__title');
  const imageEl = imageViewEl.querySelector('.image-view__image');

  let imgSize = null;

  const computeImgSize = ([width, height]) => {
    const MAX_IMAGE_SIZE = .75;

    const maxHeight = document.defaultView.innerHeight * MAX_IMAGE_SIZE;
    const maxWidth = document.defaultView.innerWidth * MAX_IMAGE_SIZE;

    const widthResize = maxWidth / width;
    const heightResize = maxHeight / height;
    const minResize = Math.min(widthResize, heightResize);

    const totalWidth = width * minResize;
    const totalHeight = height * minResize;

    imageViewEl.setAttribute('style', `--image-width: ${totalWidth.toFixed(3)}px; --image-height: ${totalHeight.toFixed(3)}px;`);
  }

  document.defaultView.addEventListener('resize', () => {
    if (imgSize === null) {
      return;
    }
    requestAnimationFrame(() => computeImgSize(imgSize));
  })

  return (title, url, width, height) => {
    onClose = () => {
      imgSize = null;
    };

    imgSize = [width, height];
    computeImgSize(imgSize);

    titleEl.textContent = imageEl.alt = title;
    imageEl.src = url;

    showPopup(popupEl);
  };
})();

const createFormOpener = (popupEl, onSubmit) => {
  const formEl = popupEl.querySelector('.popup-form');
  const inputEls = Array.from(formEl.querySelectorAll('.popup-form__input'));

  formEl.addEventListener('submit', e => {
    e.preventDefault();

    onSubmit(inputEls.map(el => el.value));

    closePopup(popupEl);
  });

  return (initialValues) => {
    inputEls.forEach((el, idx) => {
      el.value = initialValues[idx] ?? '';
    });

    showPopup(popupEl);
  };
};

const openProfileEdit = (() => {
  const popupEl = document.querySelector('.profile-edit-popup');

  const nameEl = document.querySelector('.profile__name');
  const statusEl = document.querySelector('.profile__status');

  const openForm = createFormOpener(popupEl, ([nameValue, statusValue]) => {
    nameEl.textContent = nameValue;
    statusEl.textContent = statusValue;
  });

  return () => {
    openForm([nameEl.textContent, statusEl.textContent]);
  };
})();

const openAddCard = (() => {
  const popupEl = document.querySelector('.add-card-popup');

  const openForm = createFormOpener(popupEl, ([nameValue, linkValue]) => {
    EventBus.emit('create-card', {
      name: nameValue,
      link: linkValue,
    });
  });

  return () => {
    openForm(['', '']);
  };
})();

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('mousedown', () => closePopup(popup));
});

const handlePopupEvent = ({ type, ...data }) => {
  switch (type) {
    case 'image-show': {
      const { title, url, width, height } = data;
      openImageView(title, url, width, height);
      break;
    }
    case 'profile-edit':
      openProfileEdit();
      break;
    case 'add-card':
      openAddCard();
      break;
    default:
      throw new Error('Uknown popup type');
  }
};

EventBus.register('popup', handlePopupEvent);
