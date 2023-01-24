import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { authTokens } from "../utils/auth";
import { loginUser } from "../services/actions/auth";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setValue] = useState({ password: "", token: "" });
  const user = useSelector((state) => state.auth.user);
  const { accessToken, refreshToken } = authTokens();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const auth = useCallback(
    () => (accessToken || refreshToken) && user,
    [accessToken, refreshToken, user]
  );

  const submitResetForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  if (auth()) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitResetForm}>
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
            value={form.code}
            name={"code"}
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
