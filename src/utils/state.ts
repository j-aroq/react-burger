import { TIngredient, TOrder, TUser } from "../services/types/data";

export const getItems = (state: { ingredients: { items: TIngredient[]; }; }) => state.ingredients.items;
export const getOrders = (state: { ws: { orders: TOrder[]; }; }) => state.ws.orders;
export const getOrdersAuth = (state: { wsAuth: { orders: TOrder[]; }; }) => state.wsAuth.orders;
export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getResetCode = (state: { auth: { gotResetPasswordCode: boolean; }; }) => state.auth.gotResetPasswordCode;
export const getBurgerData = (state: { burger: { burgerData: TIngredient[]; }; }) => state.burger.burgerData;
