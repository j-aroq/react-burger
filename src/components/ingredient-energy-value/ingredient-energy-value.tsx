import { FC } from "react";
import styles from "./ingredient-energy-value.module.css";

interface IEnergyValueProps {
  amount: number;
  type: string;
}

export const IngredientEnergyValue: FC<IEnergyValueProps> = ({ amount, type }) => {
  return (
    <div className={styles.energy_value_element}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {type}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {amount}
      </p>
    </div>
  );
}
