import { wsActions, wsActionsAuth } from "../../utils/store"

export type TUser = {
  name: string;
  email: string;
  password: string;
}

export type TFormValues = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
}

export type TIngredient = {
  _id: string;
  _uid: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  type: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export type TOrder = {
  _id: string;
  number: number;
  name: string;
  status: string;
  createdAt: Date;
  ingredients: string[];
}

export type TWsAction = typeof wsActions | typeof wsActionsAuth;

export type TWsMessage = {
  orders: TOrder[];
  total: number|null;
  totalToday: number|null;
};