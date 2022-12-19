import PropTypes from "prop-types";
import burgerComponentsStyles from "./burger-components.module.css";
import { ingredientType } from "../../utils/type";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerComponent = ({
  componentData,
  bunType,
  isLocked,
  bunTypeName,
}) => {
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
        />
      </div>
    </div>
  );
};

BurgerComponent.propTypes = {
  componentData: ingredientType.isRequired,
  bunType: PropTypes.string.isRequired,
  bunTypeName: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
