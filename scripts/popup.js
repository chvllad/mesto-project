import { EventBus } from './eventbus.js';

const popupEl = document.querySelector('.popup');
const closeEl = popupEl.querySelector('.popup__close');
const containerEl = popupEl.querySelector('.popup__container');
const imageViewEl = containerEl.querySelector('.image-view');
const popupFormEl = containerEl.querySelector('.popup-form');

const popupItems = [imageViewEl, popupFormEl];

let onClose = null;
let isClosing = false;

const clearPopupClasses = () => {
  popupEl.removeAttribute('style');
  popupEl.classList.remove('popup_type_form', 'popup_type_image');
  containerEl.classList.remove('popup__container_type_form', 'popup__container_type_image');
  popupItems.forEach(el => el.classList.add('popup__inactive'));
};

const closePopup = (force = false) => {
  onClose?.call();
  onClose = null;

  if (force) {
    isClosing = false;
    clearPopupClasses();
    return;
  }
  isClosing = true;
  popupEl.addEventListener('animationend', function animationEnd() {
    if (isClosing) {
      isClosing = false;
      clearPopupClasses();
    }
    popupEl.removeEventListener('animationend', animationEnd);
  });
  popupEl.setAttribute('style', 'animation: .2s ease-in both popup-close;');
};

const showPopup = (type) => {
  containerEl.classList.add(`popup__container_type_${type}`);
  popupEl.classList.add(`popup_type_${type}`);
  popupEl.setAttribute('style', 'animation: .2s ease-out both popup-open;');
};

const openImageView = (() => {
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
    closePopup(true);

    onClose = () => {
      imgSize = null;
    };

    imgSize = [width, height];
    computeImgSize(imgSize);

    titleEl.textContent = imageEl.alt = title;
    imageEl.src = url;

    imageViewEl.classList.remove('popup__inactive');
    showPopup('image');
  };
})();

const openForm = (() => {
  const titleEl = popupFormEl.querySelector('.popup-form__title');
  const buttonEl = popupFormEl.querySelector('.popup-form__save');
  const inputEls = Array.from(popupFormEl.querySelectorAll('.popup-form__input'));

  let onSubmit = null;

  popupFormEl.addEventListener('submit', e => {
    e.preventDefault();

    onSubmit?.call(null, inputEls.map(el => el.value));

    closePopup();
  });

  return (formData, initialValues, aOnSubmit) => {
    closePopup(true);
    onClose = () => {
      onSubmit = null;
    };

    onSubmit = aOnSubmit;

    popupFormEl.setAttribute('name', formData.formName);
    titleEl.textContent = formData.title;
    buttonEl.textContent = formData.buttonText;

    inputEls.forEach((el, idx) => {
      el.id = el.name = formData.inputs[idx].id;
      el.placeholder = formData.inputs[idx].title;
      el.value = initialValues[idx] ?? '';
    });

    popupFormEl.classList.remove('popup__inactive');
    showPopup('form');
  };
})();

const openProfileEdit = (() => {
  const formData = {
    formName: 'profile-form',
    title: 'Редактировать профиль',
    buttonText: 'Сохранить',
    inputs: [
      {
        id: 'name',
        title: 'Введите имя',
      },
      {
        id: 'status',
        title: 'Введите статус',
      },
    ]
  };

  const nameEl = document.querySelector('.profile__name');
  const statusEl = document.querySelector('.profile__status');

  const onSubmit = ([nameValue, statusValue]) => {
    nameEl.textContent = nameValue;
    statusEl.textContent = statusValue;
  };

  return () => {
    openForm(formData, [nameEl.textContent, statusEl.textContent], onSubmit);
  };
})();

const openAddCard = (() => {
  const formData = {
    formName: 'add-place',
    title: 'Новое место',
    buttonText: 'Создать',
    inputs: [
      {
        id: 'name',
        title: 'Название',
      },
      {
        id: 'link',
        title: 'Ссылка на картинку',
      },
    ]
  };

  const onSubmit = ([nameValue, linkValue]) => {
    EventBus.emit('create-card', {
      name: nameValue,
      link: linkValue,
    });
  };

  return () => {
    openForm(formData, ['', ''], onSubmit);
  };
})();

closeEl.addEventListener('mousedown', () => {
  closePopup();
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
