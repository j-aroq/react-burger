import { Navigate } from "react-router-dom";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { authTokens } from "../utils/auth";

export const ProtectedRouteElement = ({ element }) => {
  const user = useSelector((state) => state.auth.user);
  const { accessToken, refreshToken } = authTokens();

  const auth = useCallback(
    () => (accessToken || refreshToken) && user,
    [accessToken, refreshToken, user]
  );

  return auth() ? element : <Navigate to="/login" replace />;
};
