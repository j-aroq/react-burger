import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "../services/reducers";
import thunk from "redux-thunk";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
  WS_SEND_MESSAGE_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from "../services/constants/index";
import { socketMiddleware } from "./socketMiddleware";

export const WS_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_URL_AUTH = "wss://norma.nomoreparties.space/orders";

export type TWsMiddlewareActions = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly wsClose: typeof  WS_CONNECTION_CLOSE;
  readonly wsSendMessage: typeof WS_SEND_MESSAGE;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_MESSAGE;
};
export const wsActions: TWsMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export type TWsMiddlewareAuthActions = {
  readonly wsInit: typeof WS_CONNECTION_START_AUTH;
  readonly wsClose: typeof  WS_CONNECTION_CLOSE_AUTH;
  readonly wsSendMessage: typeof WS_SEND_MESSAGE_AUTH;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS_AUTH;
  readonly onClose: typeof WS_CONNECTION_CLOSED_AUTH;
  readonly onError: typeof WS_CONNECTION_ERROR_AUTH;
  readonly onMessage: typeof WS_GET_MESSAGE_AUTH;
};
export const wsActionsAuth:TWsMiddlewareAuthActions = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsClose: WS_CONNECTION_CLOSE_AUTH,
  wsSendMessage: WS_SEND_MESSAGE_AUTH,
  onOpen: WS_CONNECTION_SUCCESS_AUTH,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR_AUTH,
  onMessage: WS_GET_MESSAGE_AUTH,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(WS_URL, wsActions, false)),
  applyMiddleware(socketMiddleware(WS_URL_AUTH, wsActionsAuth, true))
);

export const store = createStore(rootReducer, enhancer);
