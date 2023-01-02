import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  POST_ORDER_REQUEST,
  POST_ORDER_REQUEST_SUCCESS,
  POST_ORDER_REQUEST_ERROR,
  RESET_ORDER_REQUEST_NUMBER,
} from "../actions/order";

const initialState = {
  burgerConstructor: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      const bunIndex = state.burgerConstructor.findIndex(
        (elem) => elem.type === "bun"
      );
      const bun = action.payload;

      const updatedBasket = [...state.burgerConstructor];
      if (bunIndex >= 0) {
        updatedBasket.splice(bunIndex, 1, bun);
      } else {
        updatedBasket.push(bun);
      }
      return {
        ...state,
        burgerConstructor: updatedBasket,
      };
    }
    case ADD_INGREDIENT:
      return {
        ...state,
        burgerConstructor: [...state.burgerConstructor, action.payload],
      };
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        burgerConstructor: state.burgerConstructor.filter(
          (ingredient) => ingredient._id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};
