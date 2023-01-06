import { loadIngredients } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_REQUEST_SUCCESS =
  "GET_INGREDIENTS_REQUEST_SUCCESS";
export const GET_INGREDIENTS_REQUEST_FAILED = "GET_INGREDIENTS_REQUEST_FAILED";

export const OPEN_INGREDIENT_INFO = "OPEN_INGREDIENT_INFO";
export const CLOSE_INGREDIENT_INFO = "CLOSE_INGREDIENT_INFO";

export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    loadIngredients().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_FAILED,
        });
      }
    });
  };
};
