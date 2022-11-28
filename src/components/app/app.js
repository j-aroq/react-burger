import React from 'react';
import appStyles from './app.module.css';
import { loadIngredients } from '../../utils/api';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-components/burger-components';
import { IngredientsDataContext } from '../../services/appContext';

export function App() {
  const [ingredients, setIngredients] = React.useState([]);
  
  React.useEffect(() => {
    loadIngredients(setIngredients);
  }, []);
  
  if (ingredients.length === 0) { 
    return null
  };

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <main className={appStyles.main}>
        <IngredientsDataContext.Provider value={ingredients.data} >
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsDataContext.Provider>
      </main>
    </div>
  );
}
