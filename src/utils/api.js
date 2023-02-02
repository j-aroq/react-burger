import { authTokens } from "./auth";
const urlAPI = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};

export function loadIngredients() {
  return fetch(`${urlAPI}/ingredients`).then(checkResponse);
}

export function sendOrder(ingredientsID) {
  return fetch(`${urlAPI}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsID,
    }),
  }).then(checkResponse);
}

export const registrationRequest = async ({ email, password, name }) => {
  return await fetch(`${urlAPI}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

export const loginRequest = async ({ email, password }) => {
  return await fetch(`${urlAPI}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const codeRequest = async (email) => {
  return await fetch(`${urlAPI}/password-reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(email),
  }).then(checkResponse);
};

export const changePasswordRequest = async ({ password, token }) => {
  return await fetch(`${urlAPI}/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ password, token }),
  }).then(checkResponse);
};

export const accessTokenRequest = async (refreshToken) => {
  return await fetch(`${urlAPI}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
};

export const logoutRequest = async (refreshToken) => {
  return await fetch(`${urlAPI}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
};

export const getUserInfoRequest = async () => {
  const { accessToken } = authTokens();
  return await fetch(`${urlAPI}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(checkResponse);
};

export const patchUserInfoRequest = async ({ email, password, name }) => {
  const { accessToken } = authTokens();
  return await fetch(`${urlAPI}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};
