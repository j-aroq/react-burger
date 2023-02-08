import { combineReducers } from "redux";
import { ingredientsReducer, ingredientInfoReducer } from "./ingredients";
import { burgerConstructorReducer } from "./order";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";
import { wsReducerAuth } from "./wsAuth";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientInfoReducer,
  burger: burgerConstructorReducer,
  auth: authReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth,
});
