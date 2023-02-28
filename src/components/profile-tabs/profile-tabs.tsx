import styles from "./profile-tabs.module.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authTokens } from "../../utils/auth";
import { logoutUser } from "../../services/actions/auth";
import React, { FC } from "react";

interface IProfileTabsProps {
  text: string;
}

export const ProfileTabs: FC<IProfileTabsProps> = ({ text }) => {
  const dispatch: any = useDispatch();
  const { refreshToken } = authTokens();

  let activeStyle = {
    color: "#F2F2F3",
  };

  const logout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logoutUser(refreshToken));
  };

  return (
    <div className={styles.flex}>
      <nav className={`${styles.flex} mb-20`}>
        <NavLink
          to="/profile"
          end
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
      <p className="text text_type_main-default text_color_inactive">{text}</p>
    </div>
  );
}
