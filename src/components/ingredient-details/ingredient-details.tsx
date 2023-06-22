import React from "react";
import { useDispatch, useSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { IngredientEnergyValue } from "../ingredient-energy-value/ingredient-energy-value";
import { getIngredients } from "../../services/actions/ingredients";
import { getItems } from "../../utils/state";
import { TIngredient } from "../../services/types/data";

export function IngredientDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [item, setItem] = React.useState<TIngredient>();
  const items = useSelector(getItems);

  React.useEffect(() => {
    if (items.length > 0) {
      const ingredient = items.find((elem:TIngredient) => elem._id === id);
      if (!ingredient) {
        setItem(undefined);
        navigate("/", { replace: true });
      } else {
        setItem(ingredient);
      }
    } else {
      dispatch(getIngredients());
    }
  }, [id, items, dispatch, navigate]);

  if (item) {
    return (
      <div className={styles.ingredient_info}>
        <img
          className={styles.ingredient_image}
          src={item.image}
          alt={item.name}
        ></img>
        <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
        <div className={styles.energy_value_block}>
          <IngredientEnergyValue
            type={"Калории, ккал"}
            amount={item.calories}
          />
          <IngredientEnergyValue type={"Белки, г"} amount={item.proteins} />
          <IngredientEnergyValue type={"Жиры, г"} amount={item.fat} />
          <IngredientEnergyValue
            type={"Углеводы, г"}
            amount={item.carbohydrates}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.ingredient_info}>
        <p className="text text_type_main-small">Не найдена информация об ингредиенте.</p>
      </div>
    );
  }
}
