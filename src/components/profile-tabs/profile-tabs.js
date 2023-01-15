import styles from "./profile-tabs.module.css";
import { NavLink, Link } from "react-router-dom";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfileTabs() {
  return (
    <div className={styles.flex}>
      <nav className={`${styles.flex} mb-20`}>
        <NavLink
          to="/profile"
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive pt-4 pb-4`}
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
