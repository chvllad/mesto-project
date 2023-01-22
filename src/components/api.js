import {
  queryAll,
  query,
  removeQueryData,
  setQueryData,
} from './cache/query.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '61c53b4d-2727-4569-85e7-542760592d7c',
    'Content-Type': 'application/json',
  },
};

const usersKey = 'users';
const cardsKey = 'cards';

const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Ошибка (${res.status}): ${res.statusText}`);
};

const getId = (el) => el['_id'];

/**
 * Add or update card in cache.
 * @param {any} newCard - card data.
 */
const addNewCard = (newCard) => {
  setQueryData(cardsKey, getId, newCard);
};

/**
 * Update current user in cache.
 * @param {any} user - user data.
 */
const updateUser = (user) => {
  setQueryData(usersKey, () => null, user);
};

/**
 * Get current user from server.
 * @returns {Promise<any>} json with current user.
 */
const getCurrentUser = () => fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then(getJson);

/**
 * Get all cards from server.
 * @returns {Promise<any>} json with all cards.
 */
const getInitialCards = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then(getJson);

/**
 * Create a new card.
 * @param {string} name - card's name.
 * @param {string} link - card's image link.
 * @returns {Promise<undefined>} operation result.
 */
export const sendNewCard = ({ name, link }) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({ name, link }),
}).then(getJson).then(addNewCard);

/**
 * Set or clear card's like.
 * @param {string} cardId - card's id.
 * @param {boolean} isLike - true to set like and false to clear it.
 * @returns {Promise<undefined>} operation result.
 */
export const sendLikeCard = (cardId, isLike) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: isLike ? 'PUT' : 'DELETE',
  headers: config.headers,
}).then(getJson).then(addNewCard);

/**
 * Delete card.
 * @param {string} cardId - card's id.
 * @returns {Promise<undefined>} operation result.
 */
export const sendDeleteCard = (cardId) => fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then((res) => {
  if (res.status === 200) {
    removeQueryData(cardsKey, cardId);
  } else {
    throw new Error(`Ошибка (${res.status}): ${res.statusText}`);
  }
});

/**
 * Update user's data
 * @param {string} userName - new user's name.
 * @param {string} userStatus - new user's status.
 * @returns {Promise<undefined>} operation result.
 */
export const sendUpdateUser = (userName, userStatus) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ name: userName, about: userStatus }),
}).then(getJson).then(updateUser);

/**
 * Update user's avatar
 * @param {string} link - link to the avatar.
 * @returns {Promise<undefined>} operation result.
 */
export const sendUpdateAvatar = (link) => fetch(`${config.baseUrl}/users/me/avatar `, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ avatar: link }),
}).then(getJson).then(updateUser);

/**
 * Query initial cards.
 * @returns {AsyncGenerator<KeyData>} Async iterator with initial cards.
 */
export const queryInitialCards = () => queryAll({
  cacheKey: cardsKey,
  getId: (data) => data['_id'],
  queryFn: getInitialCards,
});

/**
 * Query current user.
 * @returns {AsyncGenerator<IdData>} Async iterator with current user.
 */
export const queryCurrentUser = () => query({
  cacheKey: usersKey,
  idKey: null,
  queryFn: getCurrentUser,
});
