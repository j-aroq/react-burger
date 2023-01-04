import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import burgerComponentsStyles from "./burger-components.module.css";
import { ingredientType } from "../../utils/type";
import { REMOVE_INGREDIENT } from "../../services/actions/order";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerComponent({
  componentData,
  bunType,
  isLocked,
  bunTypeName,
}) {
  const dispatch = useDispatch();
  const burgerData = useSelector((state) => state.burger.burgerData);

  const onDeleteIngredient = (componentDataUid) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: componentDataUid,
    });
  };

  return (
    <div className={burgerComponentsStyles.component}>
      {bunType === "" ? <DragIcon type="primary" /> : null}
      <div className={burgerComponentsStyles.component_width}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={componentData.name + bunTypeName}
          price={componentData.price}
          thumbnail={componentData.image}
          handleClose={() => onDeleteIngredient(componentData._uid)}
        />
      </div>
    </div>
  );
}

BurgerComponent.propTypes = {
  componentData: ingredientType.isRequired,
  bunType: PropTypes.string.isRequired,
  bunTypeName: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
