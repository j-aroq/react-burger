import React from 'react';
import appStyles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../burger-components/burger-components';


export function App() {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
