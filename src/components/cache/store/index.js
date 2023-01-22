/**
 * Internal store to cache all queries.
 * @module cache/store
 */
import KeyData from './key-data.js';

/**
 * Key data class. Represents whole cache, where elements are grouped by some key.
 */
class Store {
  /**
   * Data cache.
   * @type {Map<string, KeyData>}
   */
  #dataByKey = new Map();

  /**
   * Add or modify a single element.
   * @param {string} key - Cache key.
   * @param {any} getId - Function to get element's id.
   * @param {(any | any[])} data - Element(s) to add.
   * @returns {KeyData} Key data with modified elements.
   */
  addOrModify(key, getId, data) {
    const keyData = this.getOrCreate(key);
    keyData.add(getId, data);
    return keyData;
  }

  /**
   * Retrieve data from cache.
   * @param {string} key - Cache key.
   * @param {string} id - IdData id.
   * @returns {IdData} An IdData.
   */
  getOrCreateById(key, id) {
    return this.getOrCreate(key).getOrCreate(id);
  }

  /**
   * Retrieve data from cache.
   * @param {string} key - Cache key.
   * @returns {KeyData} A KeyData.
   */
  getOrCreate(key) {
    let keyData = this.#dataByKey.get(key);
    if (!keyData) {
      keyData = new KeyData();
      this.#dataByKey.set(key, keyData);
    }
    return keyData;
  }

  /**
   * Remove data from cache. Removes a single element with specified key and id.
   * @param {string} key - Cache key.
   * @param {string} id - Element id.
   */
  remove(key, id) {
    this.#dataByKey.get(key)?.remove(id);
  }

  /**
   * Remove data from cache. Removes all elements with sepcified key.
   * @param {string} key - Cache key.
   */
  removeAll(key) {
    this.#dataByKey.get(key)?.removeAll();
  }
}

export default Store;
