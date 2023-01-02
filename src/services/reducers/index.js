import { combineReducers } from "redux";
import { ingredientsReducer, ingredientInfoReducer } from "./ingredients";
import { burgerConstructorReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientInfoReducer,
  burger: burgerConstructorReducer,
});
