import PropTypes from "prop-types";
import styles from "./ingredients-category.module.css";
import { Ingredient } from "../ingredient/ingredient";

export function IngredientsCategory(props) {
  return (
    <div id={props.id}>
      <h2 className="text text_type_main-medium mt-10 mb-6">{props.type}</h2>
      <div className={styles.ingredient_type_block}>
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
