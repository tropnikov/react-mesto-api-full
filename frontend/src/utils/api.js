import { serverUrl } from './utils.js';

class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #handleResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  getInitialCards() {
    return fetch(this.#baseUrl + '/cards', {
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  getUserData() {
    return fetch(this.#baseUrl + '/users/me', {
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  saveUserData(inputData) {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify(inputData),
    }).then(this.#handleResponse);
  }

  addNewCard(cardData) {
    return fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify(cardData),
    }).then(this.#handleResponse);
  }

  deleteCard(cardId) {
    return fetch(this.#baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(this.#baseUrl + `/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  likeCard(cardId) {
    return fetch(this.#baseUrl + `/cards/likes/${cardId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  dislikeCard(cardId) {
    return fetch(this.#baseUrl + `/cards/likes/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  updateAvatar(inputLink) {
    return fetch(this.#baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify(inputLink),
    }).then(this.#handleResponse);
  }
}

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    // authorization: token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
