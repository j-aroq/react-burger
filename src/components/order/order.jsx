import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { getDate } from "../../utils/date";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from "../../services/actions/ws";
import { getIngredients } from "../../services/actions/ingredients";

export function Order() {
  const { id } = useParams("");
  const { items } = useSelector((state) => state.ingredients);
  const { orders } = useSelector((state) => state.ws);
  const [orderIngredients, setOrderIngredients] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    dispatch(getIngredients());
    // return () => {
    //   dispatch({ type: WS_CONNECTION_CLOSE });
    // };
  }, [dispatch]);

  const order = React.useMemo(
    () => orders.find((order) => order._id === id) || null,
    [orders, id]
  );

  let doneOrderStyle = order
    ? order.status === "done"
      ? {
          color: "#00CCCC",
        }
      : undefined
    : undefined;

  React.useEffect(() => {
    if (order) {
      const { ingredients: orderIngredients } = order;
      const ingredientsArr = Array.from(new Set(orderIngredients));

      setOrderIngredients(
        ingredientsArr
          .map((orderIngredient) => {
            const ingredient = items.find(
              (item) => item._id === orderIngredient
            );

            return ingredient === undefined
              ? undefined
              : {
                  ...ingredient,
                  quantity: orderIngredients.filter(
                    (ingredientId) => ingredientId === ingredient._id
                  ).length,
                };
          })
          .filter((ingredient) => ingredient !== undefined)
      );
    }
  }, [items, order]);

  const getOrderStatus = () => {
    if (order.status === "created") {
      return "Создан";
    } else if (order.status === "pending") {
      return "Готовится";
    } else if (order.status === "done") {
      return "Выполнен";
    }
  };

  const totalSum = React.useMemo(() => {
    if (orderIngredients.length > 0) {
      return orderIngredients
        .map((element) => element.price)
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [orderIngredients]);

  return (
    <div className={styles.container}>
      {order && (
        <>
          <p className="text text_type_main-medium mt-10">{order.name}</p>
          <p
            className="text text_type_main-default mt-3"
            style={doneOrderStyle}
          >
            {getOrderStatus()}
          </p>
          <p className="text text_type_main-medium mt-15">Состав:</p>
          <div className={`${styles.ingredients} mt-6 pr-6`}>
            {orderIngredients.map((ingredient) => (
              <div className={styles.ingredient} key={ingredient._id}>
                <div className={`${styles.ingredient_image_container} mr-4`}>
                  <div
                    className={styles.ingredient_image}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                </div>
                <div className={`${styles.ingredient_name} mr-4`}>
                  {ingredient.name}
                </div>
                <div className={styles.ingredient_price}>
                  <p className="text text_type_digits-default mr-2">{`${ingredient.quantity} x ${ingredient.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.footer} mt-10`}>
            <div
              className={`${styles.orderStamp} text text_type_main-default text_color_inactive`}
            >
              {getDate(order.createdAt)}
            </div>
            <div className={styles.order_price}>
              <p className="text text_type_digits-default mr-2">{totalSum}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
