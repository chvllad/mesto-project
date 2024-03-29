/**
 * Profile edit popup helper module.
 * @module modal/profile-edit
 */

import { queryCurrentUser, sendUpdateUser } from '../api.js';
import FormPopup from './form-popup.js';

/** ProfileEdit helper */
class ProfileEdit extends FormPopup {
  /**
   * Create a ProfileEdit helper.
   */
  constructor() {
    super(document.querySelector('.profile-edit-popup'));
  }

  /**
   * Function called before opening.
   * @param {HTMLFormControlsCollection} elements - Form elements.
   * @protected
   */
  async onOpen({ 'profile-name': name, status }) {
    for await (const userData of queryCurrentUser()) {
      if (userData.isError) {
        throw userData.error;
      }
      if (userData.isLoaded) {
        name.value = userData.value.name;
        status.value = userData.value.about;
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
  async onSubmit({ 'profile-name': name, status }) {
    await sendUpdateUser(name.value, status.value);
  }
}

export default ProfileEdit;
