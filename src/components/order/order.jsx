import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./order.module.css";

export function Order() {
  
  return (
    <div className={styles.orderDetails}>
        <p className={`${ styles.header} text text_type_digits-default`}>
        #034533
        </p>
        <p className="text text_type_main-medium mt-10">
        Black Hole Singularity острый бургер
        </p>
        <p className={` text text_type_main-default mt-3`}>
        Выполнен
        </p>
        <p className="text text_type_main-medium mt-15">
          Состав:
        </p>
        <div className={`${styles.ingredients} mt-6`}>
                <div
                  className={styles.ingredientPreviewImage}
                />
              <div className={`${styles.ingredientName} mr-4`}>
              Black Hole Singularity острый бургер
              </div>
              <div className={styles.ingredientCountNPrice}>
                <p className="text text_type_digits-default mr-2">2 x 20</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
        <div className={`${styles.footer} mt-10`}>
          <div className={`${styles.orderStamp} text text_type_main-default text_color_inactive`}>Вчера, 13:50 i-GMT+3</div>
          <div className={styles.orderPrice}>
            <p className="text text_type_digits-default mr-2">
              510
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
  </div>

  );
}