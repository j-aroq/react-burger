import React from "react";
import PropTypes from "prop-types";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerComponent } from "../burger-components/burger-components";
import { IngredientsDataContext } from "../../services/appContext";
import { sendOrder } from "../../utils/api";
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
  const ingredientsData = React.useContext(IngredientsDataContext);
  const bun = ingredientsData.find(function (element) {
    return element.type === "bun";
  });
  const ingredientsBetweenBuns = React.useMemo(
    () => ingredientsData.filter((element) => element.type !== "bun"),
    [ingredientsData]
  );
  const ingredientsIdArr = [
    bun._id,
    ...ingredientsBetweenBuns.map((ingredient) => ingredient._id),
    bun._id,
  ];

  const totalSum = React.useMemo(() => {
    return (
      bun.price * 2 +
      ingredientsBetweenBuns.reduce((sum, item) => sum + item.price, 0)
    );
  }, [bun, ingredientsBetweenBuns]);

  function makeOrder() {
    sendOrder(ingredientsIdArr)
      .then((result) => {
        setOrderNumber(result.order.number);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsOpen(true);
      });
  }

  return (
    <div>
      <section className={`${burgerConstructorStyles.components} mt-25 ml-4`}>
        <BurgerComponent
          componentData={bun}
          bunType={"top"}
          isLocked={true}
          bunTypeName={" (верх)"}
        />
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
        </div>
        <BurgerComponent
          componentData={bun}
          bunType={"bottom"}
          isLocked={true}
          bunTypeName={" (низ)"}
        />
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
      {/* {isOpen && ( */}
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} title={""}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
      {/* )} */}
    </div>
  );
}
