class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._authorization = options.headers.authorization;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      });
  }

  getServerCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      });
  }

  addServerCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  toggleCardLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch((err) => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch(err => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }

  changeProfilePicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Algo deu errado: ${res.status}`);
      })
      .catch(err => {
        console.log("Erro. A solicitação falhou: ", err);
      })
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZlMDY5YjA1NTYyYjQ5OTJmNGMwYjkiLCJpYXQiOjE2OTUxNTE2MTksImV4cCI6MTY5NTc1NjQxOX0.T5ytWGitZmIw_h5yw9tdl6JNfFxE06fJ2gGU9gAU6qQ",
    "Content-Type": "application/json"
  }
});

export default api;