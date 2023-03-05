import React from "react";
import { useDispatch, useSelector } from "../hooks";
import { AppHeader } from "../components/app-header/app-header";
import styles from "./feed.module.css";
import { FeedOrder } from "../components/feed-order/feed-order";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from "../services/constants/index";
import { getOrders } from "../utils/state";
import { TOrder } from "../services/types/data";

export function FeedPage() {
  const { total, totalToday } = useSelector((store) => store.ws);
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      return;
    };
  }, [dispatch]);

  const feedOrders = React.useMemo(
    () => orders.filter((order) => order),
    [orders]
  );

  const doneOrders = React.useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === "done")
        .slice(0, 20)
        .map((order) => order.number),
    [feedOrders]
  );

  const pendingOrders = React.useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === "pending")
        .slice(0, 20)
        .map((order) => order.number),
    [feedOrders]
  );
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <div className={styles.flex}>
          <section className={styles.order_container}>
            {orders &&
              feedOrders.map((order) => (
                <FeedOrder
                  order={order}
                  key={order._id}
                  showOrderStatus={false}
                />
              ))}
          </section>
          <section className="ml-15">
            <div className={styles.flex}>
              <div>
                <p className="text text_type_main-medium mb-6">Готовы:</p>
                <div
                  className={`${styles.orders_list} ${styles.orders_list_done} text text_type_digits-default`}
                >
                  {doneOrders.map((orderNumber) => (
                    <div
                      className={`${styles.done_order} text text_type_digits-default mb-2`}
                      key={orderNumber}
                    >
                      {orderNumber}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-9">
                <p className="text text_type_main-medium mb-6">В работе:</p>
                <div
                  className={`${styles.orders_list} text text_type_digits-default`}
                >
                  {pendingOrders.map((orderNumber) => (
                    <div
                      className="text text_type_digits-default mb-2"
                      key={orderNumber}
                    >
                      {orderNumber}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={` mt-15`}>
              <p className="text text_type_main-medium">
                Выполнено за всё время:
              </p>
              <p className="text text_type_digits-large">{total}</p>
            </div>
            <div className={`mt-15`}>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className="text text_type_digits-large">{totalToday}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
