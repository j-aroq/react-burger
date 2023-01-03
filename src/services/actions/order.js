import { sendOrder } from "../../utils/api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_REQUEST_SUCCESS = "POST_ORDER_REQUEST_SUCCESS";
export const POST_ORDER_REQUEST_ERROR = "POST_ORDER_REQUEST_ERROR";
export const DELETE_ORDER = "DELETE_ORDER";

export const makeOrder = (burgerDataID) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    sendOrder(burgerDataID).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_REQUEST_SUCCESS,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: POST_ORDER_REQUEST_ERROR,
        });
      }
    });
  };
};
