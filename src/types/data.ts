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