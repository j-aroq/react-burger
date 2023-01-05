import styles from "./ingredient-details.module.css";
import { ingredientType } from "../../utils/type";
import { IngredientEnergyValue } from "../ingredient-energy-value/ingredient-energy-value";

export function IngredientDetails(props) {
  return (
    <div className={styles.ingredient_info}>
      <img
        className={styles.ingredient_image}
        src={props.item.image}
        alt={props.item.name}
      ></img>
      <p className="text text_type_main-medium mt-4 mb-8">{props.item.name}</p>
      <div className={styles.energy_value_block}>
        <IngredientEnergyValue
          type={"Калории, ккал"}
          amount={props.item.calories}
        />
        <IngredientEnergyValue type={"Белки, г"} amount={props.item.proteins} />
        <IngredientEnergyValue type={"Жиры, г"} amount={props.item.fat} />
        <IngredientEnergyValue
          type={"Углеводы, г"}
          amount={props.item.carbohydrates}
        />
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: ingredientType.isRequired,
};
