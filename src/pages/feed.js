import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";

export function OrdersFeedPage() {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </div>
    </div>
  );
}
