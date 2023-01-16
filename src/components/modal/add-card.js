import FormPopup from './form-popup.js';
import { createCard } from '../card.js';
import { insertCard } from '../utils.js';

/** AddCard helper */
export default class AddCard extends FormPopup {
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
  onSubmit({ 'place-name': name, link }) {
    insertCard(createCard({
      name: name.value,
      link: link.value,
    }));
  }
}
