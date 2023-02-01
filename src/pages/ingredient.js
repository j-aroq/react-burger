import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import styles from "./styles-form.module.css";
import { AppHeader } from "../components/app-header/app-header";
import { getIngredients } from "../services/actions/ingredients";

export function IngredientPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const items = useSelector((state) => state.ingredients.items);
  const ingredient = items.find((elem) => elem._id === id);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

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
