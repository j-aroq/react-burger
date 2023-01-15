import { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { useAuth } from "../utils/auth";

export function ForgotPasswordPage() {
  let auth = useAuth();

  const [form, setValue] = useState({ email: "", password: "", name: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(form);
    },
    [auth, form]
  );

  if (auth.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
          />
          <Button
            onClick={login}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default">
          Вспомнили пароль?
          <Button
            onClick={login}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pt-4 pb-2 pl-1 pr-1"
          >
            Войти
          </Button>
        </p>
      </div>
    </div>
  );
}
