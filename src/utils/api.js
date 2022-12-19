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
