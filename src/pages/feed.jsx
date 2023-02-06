import { AppHeader } from "../components/app-header/app-header";
import styles from "./feed.module.css";
import { FeedOrder } from "../components/feed-order/feed-order";

export function FeedPage() {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <div className="mr-15">
          <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
          <FeedOrder />
        </div>
        <section className={`${styles.dashboard} ml-15`}>
          <div className={styles.neighboringBlocks}>
            <div className={styles.doneContainer}>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <div className={`${styles.ordersList} ${styles.doneOrdersList} text text_type_digits-default`}>
                    67867
              </div>
            </div>
            <div className={`${styles.inProgressContainer} ml-9`}>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <div
                className={`${styles.ordersList} text text_type_digits-default`}
              >
                56675
              </div>
            </div>
          </div>
          <div className={` mt-15`}>
            <p className="text text_type_main-medium">
              Выполнено за всё время:
            </p>
            <p className="text text_type_digits-large">4534</p>
          </div>
          <div className={`mt-15`}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">23</p>
          </div>
        </section>

      </div>
    </div>
  );
}
