import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_REQUEST_SUCCESS,
  GET_INGREDIENTS_REQUEST_FAILED,
} from "../constants/index";
import { TIngredientsActions } from "../actions/ingredients";
import { TIngredient } from "../types/data";

type TIngredientsState = {
  items: TIngredient[];

  itemsRequest: boolean;
  itemsFailed: boolean;
};

const ingredientsInitialState: TIngredientsState = {
  items: [],

  itemsRequest: false,
  itemsFailed: false
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions):TIngredientsState => {
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
        items: action.items,
        itemsFailed: false,
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
