import { showPopup } from './utils.js';

class ImageViewImpl {
  #popupEl;

  #titleEl;

  #imageEl;

  constructor() {
    this.#popupEl = document.querySelector('.image-view-popup');
    this.#popupEl.classList.add('popup_animated');
    const imageViewEl = this.#popupEl.querySelector('.image-view');
    this.#titleEl = imageViewEl.querySelector('.image-view__title');
    this.#imageEl = imageViewEl.querySelector('.image-view__image');
  }

  open(title, url) {
    this.#titleEl.textContent = title;
    this.#imageEl.src = url;
    this.#imageEl.alt = title;

    showPopup(this.#popupEl);
  }
}

const imageView = new ImageViewImpl();
export default (...args) => imageView.open(...args);
