import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerComponent } from "../burger-components/burger-components";
import { sendOrder } from "../../utils/api";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/actions/order";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

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
  const [isOpen, setIsOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);

  const dispatch = useDispatch();
  const burgerData = useSelector((state) => state.burger.burgerConstructor);

  const bun = burgerData.find(function (element) {
    return element.type === "bun";
  });
  const ingredientsBetweenBuns = burgerData.filter(
    (element) => element.type !== "bun"
  );
  // const ingredientsIdArr = [
  //   bun._id,
  //   ...ingredientsBetweenBuns.map((ingredient) => ingredient._id),
  //   bun._id,
  // ];
  const onDropIngredient = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: ingredient,
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: ingredient,
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredientData) => onDropIngredient(ingredientData),
  });

  const totalSum = React.useMemo(() => {
    if (burgerData.length > 0) {
      return burgerData
        .map((element) => element.price * (element.type === "bun" ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [bun, ingredientsBetweenBuns]);

  function makeOrder() {
    // sendOrder(ingredientsIdArr)
    //   .then((result) => {
    //     setOrderNumber(result.order.number);
    //   })
    //   .catch((err) => {
    //     console.log(`Ошибка: ${err}`);
    //   })
    //   .finally(() => {
    //     setIsOpen(true);
    //   });
  }

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
                key={element._id}
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
            onClick={makeOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isOpen && (
        <Modal handleClose={() => setIsOpen(false)} title={""}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
}
