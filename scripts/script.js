const editEl = document.querySelector('.profile__edit');
const nameEl = document.querySelector('.profile__name');
const statusEl = document.querySelector('.profile__status');

const closeEl = document.querySelector('.popup__close');
const modalEl = document.querySelector('.popup');

const editNameEl = document.querySelector('.profile-edit [name="name"]');
const editStatusEl = document.querySelector('.profile-edit [name="status"]');
const editFormEl = document.querySelector('.profile-edit');

const likes = document.querySelectorAll('.place__like');
const likedMap = new WeakMap();

editEl.addEventListener('click', () => {
  editNameEl.value = nameEl.textContent;
  editStatusEl.value = statusEl.textContent;

  modalEl.classList.add('popup_opened');
});

closeEl.addEventListener('mousedown', () => {
  modalEl.classList.remove('popup_opened');
});

editFormEl.addEventListener('submit', e => {
  e.preventDefault();

  nameEl.textContent = editNameEl.value;
  statusEl.textContent = editStatusEl.value;

  modalEl.classList.remove('popup_opened');
})

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
