import { TFormValues } from "../services/types/data";
import { authTokens } from "./auth";
import { TAuthResponse, TCodeResponse, TIngredientResponse, TOrderResponse, TResponse, TTokenResponse, TUserResponse } from "../services/types/api";

const urlAPI = "https://norma.nomoreparties.space/api";

const checkResponse = <T>(res: Response) => {
  return res.ok 
    ? res.json().then((data) => data as TResponse<T>) 
    : Promise.reject(res.status);
};

export function loadIngredients() {
  return fetch(`${urlAPI}/ingredients`).then((res) => checkResponse<TIngredientResponse>(res));
}

export function sendOrder(ingredientsID: string[]) {
  const { accessToken } = authTokens();
  return fetch(`${urlAPI}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      ingredients: ingredientsID,
    }),
  }).then((res) => checkResponse<TOrderResponse>(res));
}

export const registrationRequest = async ({ email, password, name }:TFormValues) => {
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
  }).then((res) => checkResponse<TAuthResponse>(res));
};

export const loginRequest = async ({ email, password }:TFormValues) => {
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
  }).then((res) => checkResponse<TAuthResponse>(res));
};

export const codeRequest = async ({email}:TFormValues) => {
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
  // }).then((res) => checkResponse<TCodeResponse>(res));
  }).then(checkResponse);
};

export const changePasswordRequest = async ({ password, token }:TFormValues) => {
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

export const accessTokenRequest = async (refreshToken:string|undefined) => {
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
  }).then((res) => checkResponse<TTokenResponse>(res));
};

export const logoutRequest = async (refreshToken:string|undefined) => {
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
  }).then((res) => checkResponse<TUserResponse>(res));
};

export const patchUserInfoRequest = async ({ email, password, name }:TFormValues) => {
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
  }).then((res) => checkResponse<TUserResponse>(res));
};
