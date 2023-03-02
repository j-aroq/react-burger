import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_FAILED,
} from "../constants";
import { loadIngredients } from "../../utils/api";
import { TIngredient } from "../types/data";
import { AppDispatch } from "../types";

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_REQUEST_SUCCESS;
  readonly items: TIngredient[];
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_REQUEST_FAILED;
}

export type TIngredientsActions =
| IGetIngredients
| IGetIngredientsSuccess
| IGetIngredientsFailed;

export const getIngredientsSuccess = (
  items: TIngredient[]
): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_REQUEST_SUCCESS,
  items,
});

export const getIngredients = () => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    loadIngredients().then((res) => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch({
          type: GET_INGREDIENTS_REQUEST_FAILED,
        });
      }
    });
  };
};
