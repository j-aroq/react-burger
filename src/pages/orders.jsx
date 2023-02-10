import React from "react";
import { AppHeader } from "../components/app-header/app-header";
import { useDispatch, useSelector } from "react-redux";
import styles from "./orders.module.css";
import { ProfileTabs } from "../components/profile-tabs/profile-tabs";
import { FeedOrder } from "../components/feed-order/feed-order";
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
} from "../services/actions/ws";
import { getOrdersAuth } from "../utils/state";

export function OrdersPage() {
  const orders = useSelector(getOrdersAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  const profileOrders = React.useMemo(
    () => orders.filter((order) => order),
    [orders]
  );

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <ProfileTabs
          text={"В этом разделе вы можете просмотреть свою историю заказов"}
        />
        <section className={`${styles.order_container} ml-15`}>
          {orders &&
            profileOrders
              .reverse()
              .map((order) => (
                <FeedOrder order={order} key={order._id} showOrderStatus />
              ))}
        </section>
      </div>
    </div>
  );
}
