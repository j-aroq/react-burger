import React from "react";
import appStyles from "./app.module.css";
import { loadIngredients } from "../../utils/api";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { IngredientsDataContext } from "../../services/appContext";

export function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    loadIngredients()
      .then(setIngredients)
      .catch(() => alert("Во время загрузки ингредиентов произошла ошибка."));
  }, []);

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <main className={appStyles.main}>
        <IngredientsDataContext.Provider value={ingredients.data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsDataContext.Provider>
      </main>
    </div>
  );
}
