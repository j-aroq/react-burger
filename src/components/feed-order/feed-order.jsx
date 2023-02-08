import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./feed-order.module.css";
import { getDate } from "../../utils/date";
import { v4 as uuidv4 } from 'uuid';

export function FeedOrder({order}) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useSelector((state) => state.ingredients.items);
  const [orderIngredients, setOrderIngredients] = React.useState([]);
  const ingredientNumber = 6;

  const totalSum = React.useMemo(() => {
    if (orderIngredients.length > 0) {
      return orderIngredients
        .map((element) => element.price)
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [orderIngredients]);

  const handleOpenOrderModal = React.useCallback(() => {
    navigate(`/feed/${order._id}`, {
    state: { feedOrderModal: location },
    });
  }, [navigate, location, order._id]);
  
  // const orderStatus = React.useMemo(() => {
  //   const { status } = order;
  //   return getOrderStatus(status);
  // }, [order]);

  React.useEffect(() => {
    const { ingredients: orderIngredients } = order;
    setOrderIngredients(
      orderIngredients
        .map((orderIngredient) => items
          .find((item) => item._id === orderIngredient))
        .filter((item) => item !== undefined),
    );
  }, [items, order]);
  
  return (
    <div
    className={`${styles.order_container} mr-2`}
    onClick={handleOpenOrderModal}
    >
    <div className={styles.header}>
      <p className="text text_type_digits-default">
        {`#${order.number}`}
      </p>
      <p className={`${styles.order_date}  text text_type_main-default text_color_inactive`}>
      {getDate(order.createdAt)}
      </p>
    </div>
    <p className={`${styles.order_name} text text_type_main-medium mt-6`}>{order.name}</p>
    <div className={`${styles.footer} mt-6`}>
      <ul className={styles.ingredients}>
      {orderIngredients.slice(0, ingredientNumber).map((ingredient, index) => {
              const isLast = index === ingredientNumber - 1;
              return (
                <li className={styles.ingredient_image_container} key={uuidv4()}>
                  <div
                    className={`${styles.ingredient_image} ${isLast ? styles.ingredient_image_opacity : ''}`}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                  {isLast && orderIngredients.length > ingredientNumber -1  && (
                  <span className={`${styles.ingredient_image_overflow} text text_type_main-default`}>
                    {`+${orderIngredients.length - ingredientNumber + 1}`}
                  </span>
                  )}
                </li>
              );
            })}
      </ul>
      <div className={`${styles.order_total} ml-6`}>
        <p className="text text_type_digits-default mr-2">
          {totalSum}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </div>

  );
}
