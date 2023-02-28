import styles from "./styles-form.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mb-5">Ошибка 404</h1>
      <p className="text text_type_main-medium mb-10">Страница не найдена.</p>
      <p className="text text_type_main-default">
        Перейти на страницу
        <Button
          onClick={() => navigate("/")}
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pt-2 pb-1 pl-1 pr-1"
        >
          конструктора бургера
        </Button>
      </p>
    </div>
  );
}
