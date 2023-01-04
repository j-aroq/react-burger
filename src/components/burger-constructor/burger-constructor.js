import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerComponent } from "../burger-components/burger-components";
import { makeOrder } from "../../services/actions/order";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ORDER,
} from "../../services/actions/order";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";

function IngredientPriceMedium(props) {
  return (
    <div className={burgerConstructorStyles.flex}>
      <p className="text text_type_digits-medium mr-2">{props.total}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

IngredientPriceMedium.propTypes = {
  total: PropTypes.number.isRequired,
};

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { burgerData, orderNumber } = useSelector((state) => state.burger);

  const bun = burgerData.find(function (element) {
    return element.type === "bun";
  });
  const ingredientsBetweenBuns = burgerData.filter(
    (element) => element.type !== "bun"
  );

  const onDropIngredient = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredientData) => onDropIngredient(ingredientData),
  });

  const handleOpenIngredientInfoModal = () => {
    dispatch(makeOrder(burgerData.map((ingredient) => ingredient._id)));
  };
  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };

  const totalSum = React.useMemo(() => {
    if (burgerData.length > 0) {
      return burgerData
        .map((element) => element.price * (element.type === "bun" ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [bun, ingredientsBetweenBuns]);

  return (
    <div>
      <section
        className={`${burgerConstructorStyles.components} mt-25 ml-4`}
        ref={dropTarget}
      >
        {bun && (
          <BurgerComponent
            componentData={bun}
            bunType={"top"}
            isLocked={true}
            bunTypeName={" (верх)"}
          />
        )}
        <div
          className={`${burgerConstructorStyles.components_between_buns} pr-2`}
        >
          {ingredientsBetweenBuns.map((element) => {
            return (
              <BurgerComponent
                componentData={element}
                bunType={""}
                isLocked={false}
                bunTypeName={""}
                key={element._uid}
              />
            );
          })}
          {!ingredientsBetweenBuns.length && (
            <span className="text text_type_main-default mt-30 ml-30">
              Добавьте ингредиенты для Вашего бургера!
            </span>
          )}
        </div>
        {bun && (
          <BurgerComponent
            componentData={bun}
            bunType={"bottom"}
            isLocked={true}
            bunTypeName={" (низ)"}
          />
        )}
        <div className={`${burgerConstructorStyles.components_total} mt-10`}>
          <IngredientPriceMedium total={totalSum} />
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={handleOpenIngredientInfoModal}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {orderNumber && (
        <Modal handleClose={handleCloseOrderModal} title={""}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}
