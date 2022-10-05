const editEl = document.querySelector('.profile__edit');
const closeEl = document.querySelector('.popup__close');
const modalEl = document.querySelector('.popup');

editEl.addEventListener('click', () => {
  modalEl.classList.add('popup_opened');
});

closeEl.addEventListener('click', () => {
  modalEl.classList.remove('popup_opened');
});

const likes = document.querySelectorAll('.place__like');
const likedMap = new WeakMap();

likes.forEach(like => {
  like.addEventListener('click', () => {
    const isLiked = likedMap.get(like);
    if (isLiked) {
      like.classList.remove('place__like_active');
    } else {
      like.classList.add('place__like_active');
    }
    likedMap.set(like, !isLiked);
  });
})
