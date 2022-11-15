const urlAPI = "https://norma.nomoreparties.space/api/ingredients";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};
  
export function loadIngredients(setIngredients) {
  return fetch(urlAPI)
    .then(checkResponse)
    .then(setIngredients)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
}
