import { getCookie } from "./utils";

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

export const loginRequest = async (form) => {
  return await fetch("https://cosmic.nomoreparties.space/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

export const getUserRequest = async () =>
  await fetch("https://cosmic.nomoreparties.space/api/user", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

export const logoutRequest = async () => {
  return await fetch("https://cosmic.nomoreparties.space/logout", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};
