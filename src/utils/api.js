const urlAPI = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};
  
export function loadIngredients(setIngredients) {
  return fetch(`${urlAPI}/ingredients`)
    .then(checkResponse)
    .then(setIngredients)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
}

export function sendOrder(ingredientsID) {
  return fetch(`${urlAPI}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },   
    body: JSON.stringify({
      ingredients: ingredientsID
    })   
  })
  .then(checkResponse)
};
