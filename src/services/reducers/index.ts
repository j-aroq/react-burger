import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerConstructorReducer } from "./order";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";
import { wsReducerAuth } from "./wsAuth";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerConstructorReducer,
  auth: authReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth,
});
