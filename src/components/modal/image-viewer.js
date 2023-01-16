import Popup from './popup.js';

/** ImageViewer helper */
export default class ImageViewer extends Popup {
  /** @type {HTMLElement} */
  #titleEl;
  /** @type {HTMLImageElement} */
  #imageEl;

  /**
   * Create an ImageViewer helper.
   */
  constructor() {
    super(document.querySelector('.image-view-popup'));
    const imageViewEl = this.popupEl.querySelector('.image-view');
    this.#titleEl = imageViewEl.querySelector('.image-view__title');
    this.#imageEl = imageViewEl.querySelector('.image-view__image');
  }

  /**
   * Open the popup.
   * @param {string} title - Image title.
   * @param {string} url - Image address.
   * @public
   */
  open(title, url) {
    this.#titleEl.textContent = title;
    this.#imageEl.src = url;
    this.#imageEl.alt = title;

    this.show();
  }
}
