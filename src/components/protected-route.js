import { Navigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authTokens } from "../utils/auth";
import { getUserInfo, getAccessToken } from "../services/actions/auth";

export const ProtectedRouteElement = ({ element, accessType }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { accessToken, refreshToken } = authTokens();

  const auth = useCallback(
    () => (accessToken || refreshToken) && user,
    [accessToken, refreshToken, user]
  );

  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      dispatch(getUserInfo());
    }
  }, [accessToken, dispatch, refreshToken]);

  // useEffect(() => {
  //   if ((accessToken || refreshToken) && !user) {
  //     // if (!accessToken) {
  //     //   dispatch(getAccessToken(refreshToken));
  //     // }
  //     dispatch(getUserInfo());
  //   }
  // }, [accessToken, dispatch, refreshToken]);

  const render = () => {
    let elementToRender = element;
    switch (accessType) {
      case "authorized":
        if (!auth()) {
          elementToRender = <Navigate to="/login" replace />;
        }

        break;
      case "unauthorized":
        if (auth()) {
          elementToRender = <Navigate to="/" replace />;
        }
        break;
      default:
        break;
    }
    return elementToRender;
  };
  return render();
};
