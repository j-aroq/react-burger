export const getItems = (state) => state.ingredients.items;
export const getOrders = (state) => state.ws.orders;
export const getOrdersAuth = (state) => state.wsAuth.orders;
export const getUser = (state) => state.auth.user;
export const getResetCode = (state) => state.auth.gotResetPasswordCode;
export const getBurgerData = (state) => state.burger.burgerData;
