import React, {FC} from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import styles from "./burger-components.module.css";
import {
  REMOVE_INGREDIENT,
  CHANGE_INGREDIENT_POSITION,
} from "../../services/actions/order";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../types/data";

interface IBurgerComponentProps {
  componentData: TIngredient;
  index: number;
  bunType?: "top"|"bottom";
  isLocked: boolean;
  bunTypeName: string;
}

export const BurgerComponent: FC<IBurgerComponentProps> = ({
  componentData,
  index,
  bunType,
  isLocked,
  bunTypeName,
}) => {
  const dispatch: any = useDispatch();
  const ref = React.useRef<any>(null);

  const onDeleteIngredient = (componentDataUid: string) => {
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
    hover(item: any, monitor) {
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
      const hoverMiddleY = hoverBoundingRect
        ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        : 0;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y && hoverBoundingRect
        ? clientOffset.y - hoverBoundingRect.top
        : 0;

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
