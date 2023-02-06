import { AppHeader } from "../components/app-header/app-header";
import styles from "./profile.module.css";
import { ProfileTabs } from "../components/profile-tabs/profile-tabs";
import { FeedOrder } from "../components/feed-order/feed-order";

export function OrdersPage() {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <ProfileTabs
          text={"В этом разделе вы можете просмотреть свою историю заказов"}
        />
        <FeedOrder />
      </div>
    </div>
  );
}
