import { AppHeader } from "../components/app-header/app-header";
import styles from "./order.module.css";
import { Order } from "../components/order/order";
import React from "react";
import { useSelector, useDispatch } from "../hooks";
import { useParams } from "react-router-dom";
import { getOrders, getOrdersAuth } from "../utils/state";
import { useLocation } from "react-router";
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
} from "../services/constants/index";
import { TOrder } from "../services/types/data";

export function OrderPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const ordersArr = useSelector(getOrders);
  const ordersAuthArr = useSelector(getOrdersAuth);

  const orders = location.pathname.startsWith("/feed")
    ? ordersArr
    : ordersAuthArr;

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  const order = React.useMemo(
    () => orders.find((order: TOrder) => order._id === id) || null,
    [orders, id]
  );
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        {order && (
          <p className={`${styles.order_number} text text_type_digits-default`}>
            {`#${order.number}`}
          </p>
        )}
        <Order />
      </div>
    </div>
  );
}
