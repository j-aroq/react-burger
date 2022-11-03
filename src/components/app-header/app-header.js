import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon,  ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
    render() {
      return (
        <header className={`${appHeaderStyles.app_header} pt-4 pb-4 mb-10`}>  
          <nav className={appHeaderStyles.nav_header}>
            <a className={`${appHeaderStyles.nav_link} mb-4 mt-4 mr-7`}>  
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
            <a className={`${appHeaderStyles.nav_link} ml-5 mr-5 mb-4 mt-4`}>  
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </a>
            <a className={appHeaderStyles.logo}>  
              <Logo />
            </a>
            <a className={`${appHeaderStyles.nav_link} ml-5 mb-4 mt-4`}>  
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
            </a>
          </nav>
        </header>
      );
    }
  }

  export default AppHeader;