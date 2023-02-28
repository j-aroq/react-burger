import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerComponent } from "../burger-components/burger-components";
import {
  makeOrder,
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ORDER,
} from "../../services/actions/order";
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { getUser, getBurgerData } from "../../utils/state";
import { TIngredient } from "../../types/data";

export function BurgerConstructor() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { orderNumber } = useSelector((state:any) => state.burger);
  const burgerData: TIngredient[] = useSelector(getBurgerData);
  const user = useSelector(getUser);

  const bun = burgerData.find(function (element) {
    return element.type === "bun";
  });
  const ingredientsBetweenBuns = burgerData.filter(
    (element) => element.type !== "bun"
  );

  const isOrderReady = useSelector(
    (state: any) =>
      state.burger.burgerData.find((ingredient: TIngredient) => ingredient.type === "bun") &&
      state.burger.burgerData.length > 1
  );

  const onDropIngredient = (ingredient: TIngredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: {  ...ingredient, _uid: uuidv4() },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...ingredient, _uid: uuidv4() },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredientData:TIngredient) => onDropIngredient(ingredientData),
  });

  const createOrder = () => {
    if (user) {
      dispatch(makeOrder(burgerData.map((ingredient) => ingredient._id)));
    } else {
      navigate("/login");
    }
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
  }, [burgerData]);

  return (
    <>
      <section className={`${styles.components} mt-25 ml-4`} ref={dropTarget}>
        <div className="ml-8">
          {bun && (
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        <div className={`${styles.components_between_buns} pr-2`}>
          {ingredientsBetweenBuns.map((element, index) => {
            return (
              <BurgerComponent
                componentData={element}
                index={index}
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
        <div className="ml-8">
          {bun && (
            <ConstructorElement
              type={"bottom"}
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
        <div className={`${styles.components_total} mt-10`}>
          <div className={styles.flex}>
            <p className="text text_type_digits-medium mr-2">{totalSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            htmlType="button"
            onClick={createOrder}
            disabled={!isOrderReady}
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
    </>
  );
}
