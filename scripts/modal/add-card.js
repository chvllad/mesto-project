import PopupFormImpl from './popup-form.js';
import { createCard, insertCard } from '../card.js';

class AddCardImpl extends PopupFormImpl {
  constructor() {
    super(document.querySelector('.add-card-popup'));
  }

  onSubmit() {
    insertCard(createCard({
      name: this.inputEls[0].value,
      link: this.inputEls[1].value,
    }));
  }

  onOpen() {
    this.inputEls[0].value = '';
    this.inputEls[1].value = '';
  }
}

const addCard = new AddCardImpl();
export default () => addCard.open();
