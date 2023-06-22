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
} from "../constants";
import {
  logoutRequest,
  loginRequest,
  registrationRequest,
  codeRequest,
  changePasswordRequest,
  getUserInfoRequest,
  patchUserInfoRequest,
  accessTokenRequest,
} from "../../utils/api";
import { setCookies } from "../../utils/auth";
import { deleteCookie } from "../../utils/cookie";
import { TFormValues, TUser } from "../types/data";
import { AppDispatch } from "../types";

export interface IRegisterUser {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_REQUEST_SUCCESS;
  readonly user: TUser;
}
export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_REQUEST_ERROR;
}
export interface ILoginUser {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_REQUEST_SUCCESS;
  readonly user: TUser;
}
export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_REQUEST_ERROR;
}
export interface IGetRefreshToken {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IGetRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_REQUEST_SUCCESS;
}
export interface IGetRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_REQUEST_ERROR;
}
export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccess {
  readonly type: typeof LOGOUT_USER_REQUEST_SUCCESS;
}
export interface ILogoutUserFailed {
  readonly type: typeof LOGOUT_USER_REQUEST_ERROR;
}
export interface IResetPassword {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof PASSWORD_RESET_REQUEST_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof PASSWORD_RESET_REQUEST_ERROR;
}
export interface IGetPasswordResetCode {
  readonly type: typeof PASSWORD_RESET_CODE_REQUEST;
}
export interface IGetPasswordResetCodeSuccess {
  readonly type: typeof PASSWORD_RESET_CODE_REQUEST_SUCCESS;
}
export interface IGetPasswordResetCodeFailed {
  readonly type: typeof PASSWORD_RESET_CODE_REQUEST_ERROR;
}
export interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_REQUEST_SUCCESS;
  readonly user: TUser;
}
export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_REQUEST_ERROR;
}
export interface IPatchUserInfo {
  readonly type: typeof PATCH_USER_INFO_REQUEST;
}
export interface IPatchUserInfoSuccess {
  readonly type: typeof PATCH_USER_INFO_REQUEST_SUCCESS;
  readonly user: TUser;
}
export interface IPatchUserInfoFailed {
  readonly type: typeof PATCH_USER_INFO_REQUEST_ERROR;
}

export type TAuthActions =
| IRegisterUser
| IRegisterUserSuccess
| IRegisterUserFailed
| ILoginUser
| ILoginUserSuccess
| ILoginUserFailed
| IGetRefreshToken
| IGetRefreshTokenSuccess
| IGetRefreshTokenFailed
| ILogoutUser
| ILogoutUserSuccess
| ILogoutUserFailed
| IResetPassword
| IResetPasswordSuccess
| IResetPasswordFailed
| IGetPasswordResetCode
| IGetPasswordResetCodeSuccess
| IGetPasswordResetCodeFailed
| IGetUserInfo
| IGetUserInfoSuccess
| IGetUserInfoFailed
| IPatchUserInfo
| IPatchUserInfoSuccess
| IPatchUserInfoFailed;

export const registerUserSuccess = (
  user: TUser
): IRegisterUserSuccess => ({
  type: REGISTER_USER_REQUEST_SUCCESS,
  user,
});
export const loginUserSuccess = (
  user: TUser
): ILoginUserSuccess => ({
  type: LOGIN_USER_REQUEST_SUCCESS,
  user,
});
export const getUserInfoSuccess = (
  user: TUser
): IGetUserInfoSuccess => ({
  type: GET_USER_INFO_REQUEST_SUCCESS,
  user,
});
export const patchUserInfoSuccess = (
  user: TUser
): IPatchUserInfoSuccess => ({
  type: PATCH_USER_INFO_REQUEST_SUCCESS,
  user,
});

export const registerUser = ({ email, password, name }: TFormValues) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    registrationRequest({ email, password, name }).then((res) => {
      if (res && res.success) {
        setCookies(res);
        dispatch(registerUserSuccess(res.user));
      } else {
        dispatch({
          type: REGISTER_USER_REQUEST_ERROR,
        });
      }
    });
  };
};

export const loginUser = ({ email, password }: TFormValues) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    loginRequest({ email, password }).then((res) => {
      if (res && res.success) {
        setCookies(res);
        dispatch(loginUserSuccess(res.user));
      } else {
        dispatch({
          type: LOGIN_USER_REQUEST_ERROR,
        });
      }
    });
  };
};

export const getAccessToken = (refreshToken:string | undefined) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    accessTokenRequest(refreshToken).then((res) => {
      if (res && res.success) {
        setCookies(res);
        dispatch({
          type: REFRESH_TOKEN_REQUEST_SUCCESS,
        });
      } else {
        dispatch({
          type: REFRESH_TOKEN_REQUEST_ERROR,
        });
      }
    });
  };
};

export const requestCode = ({email}: TFormValues) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: PASSWORD_RESET_CODE_REQUEST,
    });
    codeRequest({email}).then((res) => {
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

export const changePassword = ({ password, token }: TFormValues) => {
  return function (dispatch:AppDispatch) {
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

export const logoutUser = (refreshToken: string | undefined) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    logoutRequest(refreshToken).then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_USER_REQUEST_SUCCESS,
        });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      } else {
        dispatch({
          type: LOGOUT_USER_REQUEST_ERROR,
        });
      }
    });
  };
};

export const getUserInfo = () => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });
    getUserInfoRequest().then((res) => {
      if (res && res.success) {
        dispatch(getUserInfoSuccess(res.user));
      } else {
        dispatch({
          type: GET_USER_INFO_REQUEST_ERROR,
        });
      }
    });
  };
};

export const patchUserInfo = ({ email, password, name }: TFormValues) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: PATCH_USER_INFO_REQUEST,
    });
    patchUserInfoRequest({ email, password, name }).then((res) => {
      if (res && res.success) {
        dispatch(patchUserInfoSuccess(res.user));
      } else {
        dispatch({
          type: PATCH_USER_INFO_REQUEST_ERROR,
        });
      }
    });
  };
};
