import {
  ADD_BUN, 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT,
  POST_ORDER_REQUEST,
  POST_ORDER_REQUEST_SUCCESS,
  POST_ORDER_REQUEST_ERROR,
  DELETE_ORDER,
  CHANGE_INGREDIENT_POSITION,
} from "../constants";
import { sendOrder } from "../../utils/api";
import { TIngredient } from "../types/data";
import { AppDispatch } from "../types";

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  payload: TIngredient;
}
export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  payload: string;
}
export interface IAddBun {
  readonly type: typeof ADD_BUN;
  payload: TIngredient;
}
export interface IMakeOrder {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IMakeOrderSuccess {
  readonly type: typeof POST_ORDER_REQUEST_SUCCESS;
  payload: number;
}
export interface IMakeOrderFailed {
  readonly type: typeof POST_ORDER_REQUEST_ERROR;
}
export interface IDeleteOrder {
  readonly type: typeof DELETE_ORDER;
}
export interface IChangeIngredientPosition {
  readonly type: typeof CHANGE_INGREDIENT_POSITION;
  payload: any;
}

export type TOrderActions =
| IAddIngredient
| IRemoveIngredient
| IAddBun
| IMakeOrder
| IMakeOrderSuccess
| IMakeOrderFailed
| IDeleteOrder
| IChangeIngredientPosition;

export const makeOrderSuccess = (
  payload: number
): IMakeOrderSuccess => ({
  type: POST_ORDER_REQUEST_SUCCESS,
  payload,
});

export const makeOrder = (burgerDataID: string[]) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    sendOrder(burgerDataID).then((res) => {
      if (res && res.success) {
        dispatch(makeOrderSuccess(res.order.number));
      } else {
        dispatch({
          type: POST_ORDER_REQUEST_ERROR,
        });
      }
    });
  };
};
