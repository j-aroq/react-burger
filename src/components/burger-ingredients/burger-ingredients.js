import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { ingredientType } from "../../utils/type";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import {
  getIngredients,
  OPEN_INGREDIENT_INFO,
  CLOSE_INGREDIENT_INFO,
} from "../../services/actions/ingredients";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({ ingredientData }) {
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
    <div>
      <div
        className={burgerIngredientsStyles.ingredient}
        onClick={handleOpenIngredientInfoModal}
        ref={dragRef}
      >
        <Counter
          className={burgerIngredientsStyles.counter}
          count={countAmount(ingredientData)}
          size="default"
        />
        <img src={ingredientData.image} alt={ingredientData.name}></img>
        <div className={burgerIngredientsStyles.flex}>
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
    </div>
  );
}

Ingredient.propTypes = {
  ingredientData: ingredientType.isRequired,
};

function IngredientsCategory(props) {
  return (
    <div>
      <h2 className="text text_type_main-medium mt-10 mb-6">{props.type}</h2>
      <div className={burgerIngredientsStyles.ingredient_type_block}>
        {props.typeArray.map((element) => {
          return <Ingredient ingredientData={element} key={element._id} />;
        })}
      </div>
    </div>
  );
}

IngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  typeArray: PropTypes.array.isRequired,
};

export function BurgerIngredients() {
  const items = useSelector((state) => state.ingredients.items);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const buns = React.useMemo(
    () => items.filter((item) => item.type === "bun"),
    [items]
  );
  const sauces = React.useMemo(
    () => items.filter((item) => item.type === "sauce"),
    [items]
  );
  const mains = React.useMemo(
    () => items.filter((item) => item.type === "main"),
    [items]
  );

  return (
    <section className={`${burgerIngredientsStyles.burger_ingredients} mr-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <nav className={burgerIngredientsStyles.flex}>
        <Tab>Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </nav>
      <div className={burgerIngredientsStyles.burger_ingredients_types}>
        <IngredientsCategory type={"Булки"} typeArray={buns} />
        <IngredientsCategory type={"Соусы"} typeArray={sauces} />
        <IngredientsCategory type={"Начинки"} typeArray={mains} />
      </div>
    </section>
  );
}
