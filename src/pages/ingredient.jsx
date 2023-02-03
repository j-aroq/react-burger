import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import styles from "./styles-form.module.css";
import { AppHeader } from "../components/app-header/app-header";

export function IngredientPage() {

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-large">Детали ингредиента</h1>
        <IngredientDetails />
      </div>
    </div>
  );
}
