import { queryCurrentUser, sendDeleteCard, sendLikeCard } from './api.js';
import ImageViewer from './modal/image-viewer.js';
import Prompt from './modal/prompt.js';

/**
 * Card helper
 */
class Card {
  /** @type {HTMLTemplateElement} */
  static #templateEl = document.querySelector('#card-template').content.firstElementChild;
  /** @type {ImageViewer} */
  static #imageViewer = new ImageViewer();
  /** @type {Prompt} */
  static #prompt = new Prompt();

  /** @type {HTMLElement} */
  #cardEl;
  /** @type {HTMLElement} */
  #likeEl;
  /** @type {HTMLElement} */
  #removeEl;
  /** @type {HTMLElement} */
  #likeCountEl;
  /** @type {boolean?} */
  #isCardLiked = null;
  /** @type {IdData} */
  #userData = null;
  /** @type {IdData} */
  #cardData;

  constructor(cardData) {
    this.#cardData = cardData;
    this.#watchChanges(queryCurrentUser(), (change) => {
      this.#userData = change;
    });
    this.#watchChanges(cardData.changes(), (change) => {
      this.#cardData = change;
    });

    const { name, link, _id: id } = cardData.value;
    const newCard = Card.#templateEl.cloneNode(true);

    const nameEl = newCard.querySelector('.place__name');
    nameEl.title = name;
    nameEl.textContent = name;

    const imgEl = newCard.querySelector('.place__img');
    imgEl.src = link;
    imgEl.title = name;
    imgEl.alt = name;

    this.#removeEl = newCard.querySelector('.place__remove');
    this.#removeEl.addEventListener('click', async () => {
      const doDelete = await Card.#prompt.open('Вы уверены?', 'Да');
      if (doDelete) {
        try {
          this.#removeEl.setAttribute('disabled', '');
          this.#removeEl.classList.add('place__remove_loading');
          await sendDeleteCard(id);
        } catch (e) {
          await Card.#prompt.open(e.message, 'OK');
          this.#removeEl.removeAttribute('disabled');
          this.#removeEl.classList.remove('place__remove_loading');
        }
      }
    });

    this.#likeEl = newCard.querySelector('.place__like');

    this.#likeEl.addEventListener('click', async () => {
      const isLiked = this.#isCardLiked;
      if (isLiked === null) {
        return;
      }
      try {
        this.#setLikeState(null);
        await sendLikeCard(id, !isLiked);
      } catch (e) {
        await Card.#prompt.open(e.message, 'OK');
      }
    });

    this.#likeCountEl = newCard.querySelector('.place__like-count');

    imgEl.addEventListener('click', () => Card.#imageViewer.open(name, link));

    this.#cardEl = newCard;

    this.#update();
  }

  /**
   * Update like button state.
   * @param {boolean?} state - can be null (state is unknown),
   * true - current user liked the card and
   * false - current user didn't liked the card.
   */
  #setLikeState(state) {
    this.#isCardLiked = state;
    this.#likeEl.classList.remove('place__like_state_liked', 'place__like_state_not-liked');
    switch (state) {
      case true:
        this.#likeEl.classList.add('place__like_state_liked');
        this.#likeEl.setAttribute('aria-pressed', true);
        this.#likeEl.removeAttribute('disabled');
        break;
      case false:
        this.#likeEl.classList.add('place__like_state_not-liked');
        this.#likeEl.setAttribute('aria-pressed', false);
        this.#likeEl.removeAttribute('disabled');
        break;
      default: // null
        this.#likeEl.setAttribute('aria-pressed', 'undefined');
        this.#likeEl.setAttribute('disabled', '');
        break;
    }
  }

  /**
   * Watch data changes.
   * @param {AsyncGenerator<IdData>} changes - async iterator with changing data.
   * @param {any} updateData - function to update current state.
   */
  async #watchChanges(changes, updateData) {
    for await (const change of changes) {
      updateData(change);
      this.#update();
    }
  }

  /**
   * Update card state.
   */
  #update() {
    const cardData = this.#cardData;
    if (cardData.isDeleted) {
      return;
    }
    this.#likeCountEl.textContent = cardData.value.likes.length;
    const userData = this.#userData;
    if (!userData || !userData.isLoaded || userData.isDeleted) {
      this.#setLikeState(null);
      return;
    }
    this.#likeEl.removeAttribute('disabled');
    const myId = userData.value['_id'];
    this.#setLikeState(cardData.value.likes.some((user) => user['_id'] === myId));
    if (cardData.value.owner['_id'] === myId) {
      this.#removeEl.classList.add('place__remove_visible');
    } else {
      this.#removeEl.classList.remove('place__remove_visible');
    }
  }

  /**
   * Card element.
   */
  get cardEl() {
    return this.#cardEl;
  }
}

export default Card;
