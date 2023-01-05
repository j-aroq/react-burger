import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-components.module.css";
import { ingredientType } from "../../utils/type";
import {
  REMOVE_INGREDIENT,
  CHANGE_INGREDIENT_POSITION,
} from "../../services/actions/order";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerComponent({
  componentData,
  index,
  bunType,
  isLocked,
  bunTypeName,
}) {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const onDeleteIngredient = (componentDataUid) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: componentDataUid,
    });
  };

  const [, dropRef] = useDrop({
    accept: "ingredientInConstructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.componentData._uid === componentData._uid) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current
        ? ref.current.getBoundingClientRect()
        : undefined;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: CHANGE_INGREDIENT_POSITION,
        payload: {
          whichIngredientDroppedUid: item.componentData._uid,
          onWhichIngredientDroppedUid: componentData._uid,
        },
      });
    },
  });

  const [, dragRef] = useDrag({
    type: "ingredientInConstructor",
    item: () => ({ componentData, index }),
  });

  dragRef(dropRef(ref));

  return (
    <div className={styles.component} ref={ref}>
      <DragIcon type="primary" />
      <div className={styles.component_width}>
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
