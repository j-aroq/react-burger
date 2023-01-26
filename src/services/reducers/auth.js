import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_REQUEST_SUCCESS,
  LOGIN_USER_REQUEST_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  REFRESH_TOKEN_REQUEST_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_REQUEST_SUCCESS,
  LOGOUT_USER_REQUEST_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_REQUEST_SUCCESS,
  PASSWORD_RESET_REQUEST_ERROR,
  PASSWORD_RESET_CODE_REQUEST,
  PASSWORD_RESET_CODE_REQUEST_SUCCESS,
  PASSWORD_RESET_CODE_REQUEST_ERROR,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_REQUEST_SUCCESS,
  GET_USER_INFO_REQUEST_ERROR,
  PATCH_USER_INFO_REQUEST,
  PATCH_USER_INFO_REQUEST_SUCCESS,
  PATCH_USER_INFO_REQUEST_ERROR,
} from "../actions/auth";

const initialState = {
  user: null,
  request: false,
  requestFailed: false,
  // tokenExpired: null,
  gotResetPasswordCode: false,
  // resetPasswordCodeEmail: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        request: true,
      };
    case REGISTER_USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: action.payload,
      };
    case REGISTER_USER_REQUEST_ERROR:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        request: true,
      };
    case LOGIN_USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: action.payload,
      };
    case LOGIN_USER_REQUEST_ERROR:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    case PASSWORD_RESET_CODE_REQUEST:
      return {
        ...state,
        request: true,
      };
    case PASSWORD_RESET_CODE_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        gotResetPasswordCode: true,
      };
    case PASSWORD_RESET_CODE_REQUEST_ERROR:
      return {
        ...state,
        request: false,
        requestFailed: true,
        gotResetPasswordCode: false,
      };
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        request: true,
      };
    case PASSWORD_RESET_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        gotResetPasswordCode: false,
      };
    case PASSWORD_RESET_REQUEST_ERROR:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        request: true,
      };
    case LOGOUT_USER_REQUEST_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: null,
      };
    case LOGOUT_USER_REQUEST_ERROR:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    default:
      return state;
  }
};
