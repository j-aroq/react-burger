import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  POST_ORDER_REQUEST,
  POST_ORDER_REQUEST_SUCCESS,
  POST_ORDER_REQUEST_ERROR,
  DELETE_ORDER,
} from "../actions/order";

const initialState = {
  burgerData: [],

  orderNumber: null,
  orderRequest: false,
  orderRequestFailed: false,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      const bunIndex = state.burgerData.findIndex(
        (elem) => elem.type === "bun"
      );
      const bun = action.payload;

      const burgerIngredients = [...state.burgerData];
      if (bunIndex >= 0) {
        burgerIngredients.splice(bunIndex, 1, bun);
      } else {
        burgerIngredients.push(bun);
      }
      return {
        ...state,
        burgerData: burgerIngredients,
      };
    }
    case ADD_INGREDIENT:
      return {
        ...state,
        burgerData: [...state.burgerData, action.payload],
      };
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        burgerData: state.burgerData.filter(
          (ingredient) => ingredient._id !== action.payload
        ),
      };
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_REQUEST_SUCCESS: {
      return {
        ...state,
        orderRequestFailed: false,
        orderNumber: action.payload,
        orderRequest: false,
      };
    }
    case POST_ORDER_REQUEST_ERROR: {
      return { ...state, orderRequestFailed: true, orderRequest: false };
    }
    case DELETE_ORDER:
      return {
        ...state,
        orderNumber: null,
        burgerData: [],
      };
    default:
      return state;
  }
};
