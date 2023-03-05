import { FC } from "react";
import styles from "./ingredients-category.module.css";
import { Ingredient } from "../ingredient/ingredient";
import { TIngredient } from "../../services/types/data";

interface IIngredientsCategoryProps {
  id: string;
  type: string;
  typeArray: TIngredient[],
}

export const IngredientsCategory:FC<IIngredientsCategoryProps> = ({id, type, typeArray}) => {
  return (
    <div id={id}>
      <h2 className="text text_type_main-medium mt-10 mb-6">{type}</h2>
      <div className={styles.ingredient_type_block}>
        {typeArray.map((element) => {
          return <Ingredient ingredientData={element} key={element._id} />;
        })}
      </div>
    </div>
  );
}
