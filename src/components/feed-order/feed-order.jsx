import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./feed-order.module.css";

export function FeedOrder() {
  
  return (
    <div
    className={styles.order_container}
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