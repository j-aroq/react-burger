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
import { loginUser } from "../services/actions/auth";
import { authTokens } from "../utils/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "", password: "" });
  const user = useSelector((state) => state.auth.user);
  const { accessToken, refreshToken } = authTokens();

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const auth = useCallback(
    () => (accessToken || refreshToken) && user,
    [accessToken, refreshToken, user]
  );

  const submitLoginForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  if (auth()) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitLoginForm}>
          <h1 className="text text_type_main-medium">Вход</h1>

          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
          />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={"password"}
            icon="ShowIcon"
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default">
          Вы — новый пользователь?
          <Button
            onClick={() => navigate("/register")}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pt-4 pb-2 pl-1 pr-1"
          >
            Зарегистрироваться
          </Button>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?
          <Button
            onClick={() => navigate("/forgot-password")}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pt-2 pb-1 pl-1 pr-1"
          >
            Восстановить пароль
          </Button>
        </p>
      </div>
    </div>
  );
}
