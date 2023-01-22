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

const addNewCard = (newCard) => {
  setQueryData(cardsKey, getId, newCard);
};

const updateUser = (user) => {
  setQueryData(usersKey, () => null, user);
};

const getCurrentUser = () => fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then(getJson);

const getInitialCards = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then(getJson);

export const sendNewCard = ({ name, link }) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({ name, link }),
}).then(getJson).then(addNewCard);

export const sendLikeCard = (cardId, isLike) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: isLike ? 'PUT' : 'DELETE',
  headers: config.headers,
}).then(getJson).then(addNewCard);

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

export const sendUpdateUser = (userName, userStatus) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ name: userName, about: userStatus }),
}).then(getJson).then(updateUser);

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
