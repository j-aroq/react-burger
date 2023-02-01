import { useLocation, NavLink, matchPath } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function AppHeader() {
  const location = useLocation();

  const activeMain = matchPath(location.pathname, "/");
  const activeFeed = matchPath(location.pathname, "/feed");
  const activeProfile = matchPath(location.pathname, "/profile");
  const activeProfileOrders = matchPath(location.pathname, "/profile/orders");

  let activeStyle = {
    color: "#F2F2F3",
  };

  return (
    <header className={`${styles.app_header} pt-4 pb-4 mb-10`}>
      <a className={styles.logo}>
        <Logo />
      </a>
      <nav className={styles.nav_header}>
        <NavLink
          to="/"
          className={`${styles.nav_link} mb-4 mt-4 mr-7`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <BurgerIcon type={activeMain ? "primary" : "secondary"} />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </NavLink>
        <NavLink
          to="/feed"
          className={`${styles.nav_link} ml-5 mr-5 mb-4 mt-4`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <ListIcon type={activeFeed ? "primary" : "secondary"} />
          <p className="text text_type_main-default ml-2">Лента заказов</p>
        </NavLink>
        <NavLink
          to="/profile"
          className={`${styles.nav_link} ${styles.justify_end} ml-5 mb-4 mt-4`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <ProfileIcon
            type={
              activeProfile || activeProfileOrders ? "primary" : "secondary"
            }
          />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}
