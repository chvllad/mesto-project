import { queryInitialCards } from './api.js';
import Card from './card.js';

/**
 * Cards list helper
 */
class CardList {
  /** @type {HTMLElement} */
  #el;
  /** @type {Map<string, Card>} */
  #cards = new Map();
  /** @type {number} */
  #lastState = 0;

  constructor() {
    this.#el = document.querySelector('.places__list');
    this.#watchCards(queryInitialCards());
    this.#renderLoading();
  }

  /**
   * Watch cards changes
   * @param {AsyncGenerator<KeyData>} cardsChanges - async iterator with initial cards.
   */
  async #watchCards(cardsChanges) {
    for await (const change of cardsChanges) {
      this.#render(change);
    }
  }

  /**
   * Render loading state.
   */
  #renderLoading() {
    if (this.#lastState !== 1) {
      this.#el.textContent = 'Загрузка...';
      this.#lastState = 1;
    }
  }

  /**
   * Render new cards state.
   * @param {KeyData} keyData - cards state.
   */
  #render(keyData) {
    if (!keyData.isLoaded) {
      this.#renderLoading();
      return;
    }
    if (keyData.isError) {
      this.#el.textContent = `Ошибка загрузки: ${keyData.error() ?? 'неизвестная ошибка'}`;
      this.#lastState = 2;
      return;
    }
    if (this.#lastState !== 3) {
      this.#el.innerHTML = '';
      this.#lastState = 3;
    }
    const oldMap = this.#cards;
    const newMap = new Map();
    const cards = keyData.getAll()
      .sort((a, b) => b.value.createdAt.localeCompare(a.value.createdAt));
    for (const cardData of cards) {
      const id = cardData.value['_id'];
      let card = oldMap.get(id);
      if (card) {
        oldMap.delete(id);
      } else {
        card = new Card(cardData);
      }
      newMap.set(id, card);
      this.#el.appendChild(card.cardEl);
    }
    for (const oldCard of oldMap.values()) {
      this.#el.removeChild(oldCard.cardEl);
    }
    this.#cards = newMap;
  }
}

export default CardList;
