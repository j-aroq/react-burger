import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/index";
import { TWsActions } from "../actions/ws";
import { TOrder } from "../types/data";
import { PayloadAction } from "@reduxjs/toolkit";

type TWsState = {
  wsConnected: boolean,
  error: PayloadAction | null,
  orders: TOrder[]
  total: number|null,
  totalToday: number|null,
};

const wsInitialState: TWsState = {
  wsConnected: false,
  error: null,
  orders: [],
  total: null,
  totalToday: null,
};

export const wsReducer = (state = wsInitialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
