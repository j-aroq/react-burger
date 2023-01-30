import styles from "./profile-tabs.module.css";
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { authTokens } from "../../utils/auth";
import { logoutUser } from "../../services/actions/auth";
import { deleteCookie } from "../../utils/cookie";

export function ProfileTabs() {
  const dispatch = useDispatch();
  const { refreshToken } = authTokens();

  let activeStyle = {
    color: "#F2F2F3",
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser(refreshToken));
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
  };

  return (
    <div className={styles.flex}>
      <nav className={`${styles.flex} mb-20`}>
        <NavLink
          to="/profile"
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/login"
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          onClick={logout}
        >
          Выход
        </NavLink>
      </nav>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
