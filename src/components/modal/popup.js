/** Popup helper */
export default class Popup {
  /** @type {string} */
  #closeKey;

  constructor(el, { closeKey } = { closeKey: 'Escape' }) {
    /**
     * Popup element.
     * @type {HTMLElement}
     * @protected
     * */
    this.popupEl = el;
    this.#closeKey = closeKey;
    el.classList.add('popup_animated');
  }

  /**
   * Show popup.
   * @protected
   * */
  show() {
    this.popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this);
    this.popupEl.addEventListener('mousedown', this);
  }

  /**
   * Hide popup.
   * @protected
   * */
  hide() {
    this.popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', this);
    this.popupEl.removeEventListener('mousedown', this);
  }

  /**
   * Event listener.
   * @param {Event} e - event element.
   * @private
   */
  handleEvent(e) {
    switch (e.type) {
      case 'keydown':
        if (e.key === this.#closeKey) {
          e.preventDefault();
          this.hide();
        }
        break;
      case 'mousedown': {
        const { target } = e;
        if (target.classList.contains('popup') || target.classList.contains('popup__close')) {
          this.hide();
        }
        break;
      }
      default: break;
    }
  }
}
