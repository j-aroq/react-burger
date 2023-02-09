import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import styles from "./ingredient.module.css";
import { ingredientType } from "../../utils/type";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getBurgerData } from "../../utils/state";

export function Ingredient({ ingredientData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const burgerData = useSelector(getBurgerData);

  const countAmount = React.useCallback(
    (ingredientData) => {
      const { _id, type } = ingredientData;
      const ingredientsAmount = burgerData.filter(
        (element) => element._id === _id
      ).length;
      return type === "bun" ? ingredientsAmount * 2 : ingredientsAmount;
    },
    [burgerData]
  );

  const handleOpenIngredientInfoModal = React.useCallback(() => {
    navigate(`/ingredients/${ingredientData._id}`, {
      state: { ingredientModal: location },
    });
  }, [navigate, location, ingredientData._id]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData,
  });

  return (
    <div
      className={styles.ingredient}
      onClick={handleOpenIngredientInfoModal}
      ref={dragRef}
    >
      <Counter
        className={styles.counter}
        count={countAmount(ingredientData)}
        size="default"
      />
      <img src={ingredientData.image} alt={ingredientData.name}></img>
      <div className={styles.flex}>
        <p className="text text_type_digits-default mr-2">
          {ingredientData.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-6">{ingredientData.name}</p>
    </div>
  );
}

Ingredient.propTypes = {
  ingredientData: ingredientType.isRequired,
};
