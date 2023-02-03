import { Navigate, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authTokens } from "../utils/auth";
import { getUserInfo, getAccessToken } from "../services/actions/auth";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element, accessType }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state: locationState } = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { accessToken, refreshToken } = authTokens();

  const auth = useCallback(
    () => (accessToken || refreshToken) && user,
    [accessToken, refreshToken, user]
  );

  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      if (!accessToken) {
        dispatch(getAccessToken(refreshToken));
      }
      dispatch(getUserInfo());
    }
  }, [accessToken, dispatch, refreshToken, user]);

  const render = () => {
    let elementToRender = element;
    switch (accessType) {
      case "authorized":
        if (!auth()) {
          elementToRender = (
            <Navigate to="/login" replace state={{ redirectTo: location }} />
          );
        }
        break;
      case "unauthorized":
        if (auth()) {
          if (locationState) {
            const { redirectTo } = locationState;
            elementToRender = (
              <Navigate
                to={`${redirectTo.pathname}`}
                replace
                state={{ redirectTo: location }}
              />
            );
          } else {
            elementToRender = (<Navigate to="/" replace state={{ redirectTo: location }} />);
          }
        }
        break;
      default:
        break;
    }
    return elementToRender;
  };
  return render();
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  accessType: PropTypes.string,
};
