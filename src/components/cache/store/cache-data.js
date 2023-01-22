/** @module cache/store */

/**
 * Cache data class. Abstract class, which contains current state of the element
 * and methods to add notification listeners.
 * @abstract
 */
class CacheData {
  #isDeleted = false;
  #isError = false;
  #error = null;
  #changePromise;
  #changeResolve;
  #isLoaded;

  /**
   * Construct cache data.
   * @param {boolean} isLoaded - is data already loaded.
   */
  constructor(isLoaded) {
    this.#newChangePromise();
    this.#isLoaded = isLoaded;
  }

  /**
   * Get deteted state.
   */
  get isDeleted() {
    return this.#isDeleted;
  }

  /**
   * Get loading state.
   */
  get isLoaded() {
    return this.#isLoaded;
  }

  /**
   * Get error state.
   */
  get isError() {
    return this.#isError;
  }

  /**
   * Get error data.
   */
  get error() {
    return this.#error;
  }

  /**
   * Mark data as deleted.
   */
  markDeleted() {
    this.#isDeleted = true;
    this.#notify();
  }

  /**
   * Set data error.
   */
  setError(error) {
    this.#error = error;
    this.#isError = true;
    this.#notify();
  }

  /**
   * Change data state to loading.
   */
  setLoading() {
    this.#error = null;
    this.#isError = false;
    this.#isLoaded = false;
    this.#notify();
  }

  /**
   * Iterate over changes in this IdData. Returns this IdData element immediately and then
   * continuously returns it again after each update until element gets deleted.
   * @returns {AsyncGenerator<IdData>} Async changes iterator.
   */
  async* changes() {
    yield this;
    while (!this.#isDeleted) {
      // eslint-disable-next-line no-await-in-loop
      await this.#changePromise;
      yield this;
    }
  }

  /**
   * Renew change promise.
   */
  #newChangePromise() {
    this.#changePromise = new Promise((res) => {
      this.#changeResolve = res;
    });
  }

  /**
   * Yield a new iteration in .change() generator. Notifies listeners that data was changed.
   */
  #notify() {
    const oldResolve = this.#changeResolve;
    this.#newChangePromise();
    oldResolve();
  }

  /**
   * Notify listeners that data was updated.
   * @protected
   */
  notifyValueUpdated() {
    this.#isLoaded = true;
    if (this.#isError) {
      this.#isError = false;
      this.#error = null;
    }
    this.#notify();
  }
}

export default CacheData;
