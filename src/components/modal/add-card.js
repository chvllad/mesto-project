/**
 * Add card popup helper module.
 * @module modal/add-card
 */

import { sendNewCard } from '../api.js';
import FormPopup from './form-popup.js';

/** AddCard helper */
class AddCard extends FormPopup {
  /**
   * Create an AddCard helper.
   */
  constructor() {
    super(document.querySelector('.add-card-popup'));
  }

  /**
   * Function called after submit
   * @param {HTMLFormControlsCollection} elements - Form elements.
   * @override
   * @protected
   */
  async onSubmit({ 'place-name': name, link }) {
    await sendNewCard({ name: name.value, link: link.value });
  }
}

export default AddCard;
