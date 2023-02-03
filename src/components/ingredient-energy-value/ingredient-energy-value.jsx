import PropTypes from "prop-types";
import styles from "./ingredient-energy-value.module.css";

export function IngredientEnergyValue(props) {
  return (
    <div className={styles.energy_value_element}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {props.type}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {props.amount}
      </p>
    </div>
  );
}

IngredientEnergyValue.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};
