export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return res.ok;
      }
      else {
        return Promise.reject(res)
      }
    })
    .catch(err => {
      console.error(`Erro ${err.status}: Um dos campos não foi preenchido corretamente`)
    })
};
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      else {
        return Promise.reject(res);
      }
    })
    .catch(err => {
      if (err.status === 400) {
        console.error(`Erro ${err.status}: Um ou mais campos não foram fornecidos`)
      } else if (err.status === 401) {
        console.error(`Erro ${err.status}: O usuário com o e-mail especificado não foi encontrado `)
      }
    })
};
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => data)
}