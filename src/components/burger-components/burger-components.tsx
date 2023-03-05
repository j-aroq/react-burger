import React, {FC} from "react";
import { useDispatch } from "../../hooks";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-components.module.css";
import {
  REMOVE_INGREDIENT,
  CHANGE_INGREDIENT_POSITION,
} from "../../services/constants/index";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../services/types/data";

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
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);

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
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      let definedItem;
      if (typeof item === 'object') {
        definedItem = item as { index: number, componentData: (TIngredient & { _uid: string }) };
        
      } else {return; }

      if (definedItem.componentData._uid === componentData._uid) {
        return;
      }

      const dragIndex = definedItem.index;
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
          whichIngredientDroppedUid: definedItem.componentData._uid,
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
