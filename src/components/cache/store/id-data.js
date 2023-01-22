/** @module cache/store */
import CacheData from './cache-data.js';

/**
 * Id data class. Represents a single element in the cache.
 */
class IdData extends CacheData {
  #value = null;

  /**
   * Construct id data.
   * @param {any} value - preloaded value.
   */
  constructor(...args) {
    /* Since value can be null or undefined check args count
       to find if value is actually supplied
    */
    const hasValue = args.length >= 1;
    super(hasValue);
    if (hasValue) {
      [this.#value] = args;
    }
  }

  /**
   * Get current value.
   */
  get value() {
    return this.#value;
  }

  /**
   * Set new value.
   */
  setNewValue(newValue) {
    this.#value = newValue;
    this.notifyValueUpdated();
  }
}

export default IdData;
