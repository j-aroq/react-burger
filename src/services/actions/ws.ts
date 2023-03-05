import { PayloadAction } from "@reduxjs/toolkit";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from "../constants";
import { TOrder, TWsMessage } from "../types/data";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionFailed {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: PayloadAction
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TWsMessage;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWsActions =
| IWsConnectionStart
| IWsConnectionSuccess
| IWsConnectionFailed
| IWsConnectionClosed
| IWsConnectionClose
| IWsGetMessage
| IWsSendMessage;

export interface IWsConnectionStartAuth {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}
export interface IWsConnectionSuccessAuth {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
}
export interface IWsConnectionFailedAuth {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  payload: PayloadAction
}
export interface IWsConnectionClosedAuth {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
}
export interface IWsConnectionCloseAuth {
  readonly type: typeof WS_CONNECTION_CLOSE_AUTH;
}
export interface IWsGetMessageAuth {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  payload: TWsMessage;
}
export interface IWsSendMessageAuth {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
}

export type TWsAuthActions =
| IWsConnectionStartAuth
| IWsConnectionSuccessAuth
| IWsConnectionFailedAuth
| IWsConnectionClosedAuth
| IWsConnectionCloseAuth
| IWsGetMessageAuth
| IWsSendMessageAuth;
