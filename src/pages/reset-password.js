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

export function ResetPasswordPage() {
  let auth = useAuth();

  const [form, setValue] = useState({ email: "", password: "", code: "" });

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

          <PasswordInput
            type={"password"}
            placeholder={"Введите новый пароль"}
            onChange={onChange}
            value={form.password}
            name={"password"}
            icon="ShowIcon"
            // onIconClick={onIconClick}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.code}
            name={"code"}
          />
          <Button
            onClick={login}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Сохранить
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
