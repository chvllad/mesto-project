/** @module cache/store */
import IdData from './id-data.js';
import CacheData from './cache-data.js';

/**
 * Key data class. Represents a group of elements with the same key in the cache.
 */
class KeyData extends CacheData {
  #dataById = new Map();

  constructor() {
    super(false);
  }

  /**
   * Add or modify element.
   * @param {any} getId - Function to get element's id.
   * @param {any} item - Element to add.
   */
  #updateOrAddIdData(getId, item) {
    const id = getId(item);
    const idData = this.#dataById.get(id);
    if (idData) {
      idData.setNewValue(item);
      return;
    }
    const newIdData = new IdData(item);
    this.#dataById.set(id, newIdData);
  }

  /**
   * Add or modify element(s).
   * @param {any} getId - Function to get element's id.
   * @param {(any | any[])} value - Element(s) to add.
   */
  add(getId, value) {
    if (Array.isArray(value)) {
      value.forEach((item) => this.#updateOrAddIdData(getId, item));
    } else {
      this.#updateOrAddIdData(getId, value);
    }
    this.notifyValueUpdated();
  }

  /**
   * Retrieve element from cache.
   * @param {string} id - IdData id.
   * @returns {IdData} element.
   */
  getOrCreate(id) {
    let rv = this.#dataById.get(id);
    if (rv) {
      return rv;
    }
    rv = new IdData();
    this.#dataById.set(id, rv);
    return rv;
  }

  /**
   * Retrieve all elements from cache.
   * @param {string} id - IdData id.
   * @returns {IdData[]} elements.
   */
  getAll() {
    return Array.from(this.#dataById.values());
  }

  /**
   * Remove element from cache.
   * @param {string} id - element's id.
   * @returns {boolean} true if element was found and deleted.
   */
  remove(id) {
    const data = this.#dataById.get(id);
    if (data) {
      data.markDeleted();
      this.#dataById.delete(id);
      this.notifyValueUpdated();
      return true;
    }
    return false;
  }

  /**
   * Clear cache.
   */
  removeAll() {
    this.#dataById.forEach((data) => {
      data.markDeleted();
    });
    this.notifyValueUpdated();
  }

  #getOrCreateIdData(getId, item) {
    const id = getId(item);
    const idData = this.#dataById.get(id);
    if (idData) {
      idData.setNewValue(item);
      this.#dataById.delete(id);
      return [id, idData];
    }
    return [id, new IdData(item)];
  }

  /**
   * Replaces all element. Updates element width the same id.
   * @param {any} getId - Function to get element's id.
   * @param {(any | any[])} value - Element(s) to add.
   */
  replace(getId, value) {
    let newMap;
    if (Array.isArray(value)) {
      newMap = new Map(value.map((item) => this.#getOrCreateIdData(getId, item)));
    } else {
      newMap = new Map([this.#getOrCreateIdData(getId, value)]);
    }
    this.#dataById.forEach((idData) => idData.markDeleted());
    this.#dataById = newMap;
    this.notifyValueUpdated();
  }
}

export default KeyData;
