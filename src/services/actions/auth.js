import {
  tokenRequest,
  logoutRequest,
  loginRequest,
  registrationRequest,
  codeRequest,
  changePasswordRequest,
} from "../../utils/api";
import { setCookies } from "../../utils/auth";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_REQUEST_SUCCESS = "REGISTER_USER_REQUEST_SUCCESS";
export const REGISTER_USER_REQUEST_ERROR = "REGISTER_USER_REQUEST_ERROR";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_REQUEST_SUCCESS = "LOGIN_USER_REQUEST_SUCCESS";
export const LOGIN_USER_REQUEST_ERROR = "LOGIN_USER_REQUEST_ERROR";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_SUCCESS = "REFRESH_TOKEN_REQUEST_SUCCESS";
export const REFRESH_TOKEN_REQUEST_ERROR = "REFRESH_TOKEN_REQUEST_ERROR";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_REQUEST_SUCCESS = "LOGOUT_USER_REQUEST_SUCCESS";
export const LOGOUT_USER_REQUEST_ERROR = "LOGOUT_USER_REQUEST_ERROR";

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_REQUEST_SUCCESS = "PASSWORD_RESET_REQUEST_SUCCESS";
export const PASSWORD_RESET_REQUEST_ERROR = "PASSWORD_RESET_REQUEST_ERROR";

export const PASSWORD_RESET_CODE_REQUEST = "PASSWORD_RESET_CODE_REQUEST";
export const PASSWORD_RESET_CODE_REQUEST_SUCCESS =
  "PASSWORD_RESET_CODE_REQUEST_SUCCESS";
export const PASSWORD_RESET_CODE_REQUEST_ERROR =
  "PASSWORD_RESET_CODE_REQUEST_ERROR";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_REQUEST_SUCCESS = "GET_USER_INFO_REQUEST_SUCCESS";
export const GET_USER_INFO_REQUEST_ERROR = "GET_USER_INFO_REQUEST_ERROR";

export const PATCH_USER_INFO_REQUEST = "PATCH_USER_INFO_REQUEST";
export const PATCH_USER_INFO_REQUEST_SUCCESS =
  "PATCH_USER_INFO_REQUEST_SUCCESS";
export const PATCH_USER_INFO_REQUEST_ERROR = "PATCH_USER_INFO_REQUEST_ERROR";

export const registerUser = ({ email, password, name }) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    registrationRequest({ email, password, name }).then((res) => {
      if (res && res.success) {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: REGISTER_USER_REQUEST_SUCCESS,
          payload: res.user,
        });
      } else {
        dispatch({
          type: REGISTER_USER_REQUEST_ERROR,
        });
      }
    });
  };
};

export const loginUser = ({ email, password }) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginRequest({ email, password }).then((res) => {
      if (res && res.success) {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: LOGIN_USER_REQUEST_SUCCESS,
          payload: res.user,
        });
      } else {
        dispatch({
          type: LOGIN_USER_REQUEST_ERROR,
        });
      }
    });
  };
};

export const requestCode = (email) => {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_CODE_REQUEST,
    });
    codeRequest(email).then((res) => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_CODE_REQUEST_SUCCESS,
        });
      } else {
        dispatch({
          type: PASSWORD_RESET_CODE_REQUEST_ERROR,
        });
      }
    });
  };
};

export const changePassword = ({ password, token }) => {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    changePasswordRequest({ password, token }).then((res) => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_REQUEST_SUCCESS,
        });
      } else {
        dispatch({
          type: PASSWORD_RESET_REQUEST_ERROR,
        });
      }
    });
  };
};
