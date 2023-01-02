import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_FAILED,
  OPEN_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
} from "../actions/ingredients";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_REQUEST_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_INGREDIENTS_REQUEST_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};

const initialStateIngredient = {
  ingredientInformation: null,
};

export const ingredientInfoReducer = (
  state = initialStateIngredient,
  action
) => {
  switch (action.type) {
    case OPEN_INGREDIENT_INFO: {
      return {
        ...state,
        ingredientInformation: action.payload,
      };
    }
    case CLOSE_INGREDIENT_INFO: {
      return {
        ...state,
        ingredientInformation: null,
      };
    }
    default: {
      return state;
    }
  }
};
