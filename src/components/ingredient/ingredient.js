import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import styles from "./ingredient.module.css";
import { ingredientType } from "../../utils/type";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import {
  OPEN_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
} from "../../services/actions/ingredients";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function Ingredient({ ingredientData }) {
  const dispatch = useDispatch();
  const ingredientInfo = useSelector(
    (state) => state.ingredientInfo.ingredientInformation
  );
  const burgerData = useSelector((state) => state.burger.burgerData);

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

  const handleOpenIngredientInfoModal = () => {
    dispatch({ type: OPEN_INGREDIENT_INFO, payload: ingredientData });
  };

  const handleCloseIngredientInfoModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_INFO });
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData,
  });

  return (
    <>
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
        <p className="text text_type_main-default mb-6">
          {ingredientData.name}
        </p>
      </div>
      {ingredientInfo && (
        <Modal
          handleClose={handleCloseIngredientInfoModal}
          title={"Детали ингредиента"}
        >
          <IngredientDetails item={ingredientInfo} />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredientData: ingredientType.isRequired,
};
