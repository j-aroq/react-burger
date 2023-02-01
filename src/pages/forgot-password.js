import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { requestCode } from "../services/actions/auth";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "" });
  const { gotResetPasswordCode } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const submitForgotPasswordForm = (e) => {
    e.preventDefault();
    dispatch(requestCode(form));
  };

  if (gotResetPasswordCode) {
    return <Navigate to="/reset-password" />;
  }

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitForgotPasswordForm}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
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
