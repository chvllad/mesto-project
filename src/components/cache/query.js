import Store from './store/index.js';

const store = new Store();

/**
 * Query function.
 *
 * @callback QueryFunction
 * @returns {Promise<any>}
 */

/**
 * Querying elements in progress.
 * @type {Set<IdData>}
 */
const querySet = new Set();

/**
 * Query a single element. Returns IdData element immediately and then
 * continuously returns it again after each update until element gets deleted.
 * @param {object} config - Query configuration.
 * @param {string} config.cacheKey - Cache key.
 * @param {any} config.idKey - Element's id field name.
 * @param {QueryFunction?} config.queryFn - Query function.
 * @returns {AsyncGenerator<IdData>} Async query result iterator.
 */
export async function* query({
  cacheKey,
  idKey,
  queryFn,
}) {
  const idData = store.getOrCreateById(cacheKey, idKey);
  if (idData.isLoaded) {
    yield* idData.changes();
    return;
  }
  if (querySet.has(idData)) {
    yield* idData.changes();
    return;
  }
  if (!queryFn) {
    throw new Error('Элемент не найдет в кэше');
  }
  querySet.add(idData);
  try {
    idData.setLoading();
    yield idData;
    idData.setNewValue(await queryFn());
  } catch (e) {
    idData.setError(e);
  } finally {
    querySet.delete(idData);
  }
  yield* idData.changes();
}

/**
 * Query elements. Returns KeyData element immediately and then
 * continuously returns it again after each addition and/or removal of child elements.
 * @param {object} config - Query configuration.
 * @param {string} config.cacheKey - Cache key.
 * @param {any} config.getId - Element's id getter.
 * @param {QueryFunction} config.queryFn - Query function.
 * @returns {AsyncGenerator<KeyData>} Async query result iterator.
 */
export async function* queryAll({
  cacheKey,
  getId,
  queryFn,
}) {
  const keyData = store.getOrCreate(cacheKey);
  yield keyData;
  try {
    keyData.replace(getId, await queryFn());
  } catch (e) {
    keyData.setError(e);
  }
  yield* keyData.changes();
}

export const setQueryData = (cacheKey, getId, data) => {
  store.addOrModify(cacheKey, getId, data);
};

export const removeQueryData = (cacheKey, id) => {
  store.remove(cacheKey, id);
};

export const removeAllQueryData = (cacheKey) => {
  store.removeAll(cacheKey);
};
