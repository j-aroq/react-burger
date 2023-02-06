import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./feed-order.module.css";

export function FeedOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenOrdelModal = React.useCallback(() => {
    navigate("/feed/order", {
      // navigate(`/feed/${order._id}`, {
      state: { feedOrderModal: location },
    });
  }, [navigate, location]);
// }, [navigate, location, order._id]);
  
  return (
    <div
    className={styles.order_container}
    onClick={handleOpenOrdelModal}
    >
    <div className={styles.header}>
      <p className="text text_type_digits-default">
        #676876
      </p>
      <p className={`${styles.order_date}  text text_type_main-default text_color_inactive`}>
      Сегодня, 16:20 i-GMT+3
      </p>
    </div>
    <p className="text text_type_main-medium mt-6">
    Death Star Starship Main бургер
    </p>
    <div className={`${styles.footer} mt-6`}>
      <ul className={styles.ingredients}>
      </ul>
      <div className={`${styles.orderPrice} ml-6`}>
        <p className="text text_type_digits-default mr-2">
          480
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </div>

  );
}