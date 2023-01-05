import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function AppHeader() {
  return (
    <header className={`${styles.app_header} pt-4 pb-4 mb-10`}>
      <nav className={styles.nav_header}>
        <a className={`${styles.nav_link} mb-4 mt-4 mr-7`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </a>
        <a className={`${styles.nav_link} ml-5 mr-5 mb-4 mt-4`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </p>
        </a>
        <a className={styles.logo}>
          <Logo />
        </a>
        <a className={`${styles.nav_link} ml-5 mb-4 mt-4`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </a>
      </nav>
    </header>
  );
}
