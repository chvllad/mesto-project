/**
 * Avatar edit popup helper module.
 * @module modal/avatar-edit
 */
import FormPopup from './form-popup.js';
import { queryCurrentUser, sendUpdateAvatar } from '../api.js';

/** AvatarEdit helper */
class AvatarEdit extends FormPopup {
  /**
   * Create a AvatarEdit helper.
   */
  constructor() {
    super(document.querySelector('.avatar-edit-popup'));
  }

  /**
   * Function called before opening.
   * @param {HTMLFormControlsCollection} elements - Form elements.
   * @protected
   */
  async onOpen({ link }) {
    for await (const userData of queryCurrentUser()) {
      if (userData.isError) {
        throw userData.error;
      }
      if (userData.isLoaded) {
        link.value = userData.value.avatar;
        return;
      }
    }
  }

  /**
   * Function called after submit
   * @param {HTMLFormControlsCollection} elements - Form elements.
   * @override
   * @protected
   */
  async onSubmit({ link }) {
    await sendUpdateAvatar(link.value);
  }
}

export default AvatarEdit;
