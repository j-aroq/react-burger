import { TIngredient, TOrder, TUser } from "./data";

export type TResponse<T> = {
  success: boolean;
} & T;

export type TIngredientResponse = {
  data: TIngredient[];
};

export type TOrderResponse = {
  order: TOrder;
};

export type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TUserResponse = {
  user: TUser;
};

export type TAuthResponse = TTokenResponse & TUserResponse;

export type TCodeResponse = {
  data: any;
};
