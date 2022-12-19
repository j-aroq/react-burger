import React from "react";
import PropTypes from "prop-types";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { ingredientType } from "../../utils/type";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { IngredientsDataContext } from "../../services/appContext";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({ ingredientData }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div
        className={burgerIngredientsStyles.ingredient}
        onClick={() => setIsOpen(true)}
      >
        <Counter
          className={burgerIngredientsStyles.counter}
          count={1}
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
      <Modal
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
        title={"Детали ингредиента"}
      >
        <IngredientDetails item={ingredientData} />
      </Modal>
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
  const ingredientsData = React.useContext(IngredientsDataContext);

  const buns = React.useMemo(
    () => ingredientsData.filter((item) => item.type === "bun"),
    [ingredientsData]
  );
  const sauces = React.useMemo(
    () => ingredientsData.filter((item) => item.type === "sauce"),
    [ingredientsData]
  );
  const mains = React.useMemo(
    () => ingredientsData.filter((item) => item.type === "main"),
    [ingredientsData]
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
