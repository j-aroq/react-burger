import { AppHeader } from "../components/app-header/app-header";
import styles from "./order.module.css";
import { Order } from "../components/order/order";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function OrderPage() {
  const { id } = useParams("");
  const { orders } = useSelector((state) => state.ws);

  const order = React.useMemo(
    () => orders.find((order) => order._id === id) || null,
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
