import { AppHeader } from "../components/app-header/app-header";
import styles from "./feed.module.css";
import { Order} from "../components/order/order";

export function OrderPage() {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <Order />
      </div>
    </div>
  );
}
