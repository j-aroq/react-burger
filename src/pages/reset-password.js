import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { changePassword } from "../services/actions/auth";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setValue] = useState({ password: "", token: "" });
  const { gotResetPasswordCode } = useSelector(
    (state) => state.auth.gotResetPasswordCode
  );

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitResetPasswordForm = (e) => {
    e.preventDefault();
    dispatch(changePassword(form));
  };

  if (!gotResetPasswordCode) {
    return <Navigate to={"/forgot-password"} />;
  }

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitResetPasswordForm}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>

          <PasswordInput
            type={"password"}
            placeholder={"Введите новый пароль"}
            onChange={onChange}
            value={form.password}
            name={"password"}
            icon="ShowIcon"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.token}
            name={"token"}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <p className="text text_type_main-default">
          Вспомнили пароль?
          <Button
            onClick={() => navigate("/login")}
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
