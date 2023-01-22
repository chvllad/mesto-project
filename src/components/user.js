import { queryCurrentUser } from './api.js';
import AddCard from './modal/add-card.js';
import ProfileEdit from './modal/profile-edit.js';
import AvatarEdit from './modal/avatar-edit.js';

/**
 * User helper
 */
class User {
  static #addCard = new AddCard();
  static #profileEdit = new ProfileEdit();
  static #avatarEdit = new AvatarEdit();

  /** @type {HTMLElement} */
  #el;
  /** @type {HTMLElement} */
  #nameEl;
  /** @type {HTMLElement} */
  #statusEl;
  /** @type {HTMLImageElement} */
  #avatarEl;

  constructor() {
    this.#el = document.querySelector('.profile');
    this.#nameEl = this.#el.querySelector('.profile__name');
    this.#statusEl = this.#el.querySelector('.profile__status');
    this.#avatarEl = this.#el.querySelector('.profile__photo');

    this.#el.querySelector('.profile__edit').addEventListener('click', () => {
      User.#profileEdit.open();
    });
    this.#el.querySelector('.profile__add').addEventListener('click', () => {
      User.#addCard.open();
    });
    this.#el.querySelector('.profile__photo-edit').addEventListener('click', () => {
      User.#avatarEdit.open();
    });

    this.#watchChanges(queryCurrentUser());
    this.#update(null);
  }

  /**
   * Watch user changes
   * @param {AsyncGenerator<IdData>} userChanges - async iterator with user data.
   */
  async #watchChanges(userChanges) {
    for await (const change of userChanges) {
      this.#update(change);
    }
  }

  /**
   * Update user state.
   * @param {IdData} userData - user state.
   */
  #update(userData) {
    if (userData?.isError) {
      this.#el.classList.add('element-loading');
      this.#el.setAttribute('data-load-error', userData.error.message.replace('"', ''));
      return;
    }
    this.#el.removeAttribute('data-load-error');
    if (!userData || !userData.isLoaded || userData.isDeleted) {
      this.#el.classList.add('element-loading');
      return;
    }
    this.#nameEl.textContent = userData.value.name;
    this.#statusEl.textContent = userData.value.about;
    this.#avatarEl.src = userData.value.avatar;
    this.#el.classList.remove('element-loading');
  }
}

export default User;
