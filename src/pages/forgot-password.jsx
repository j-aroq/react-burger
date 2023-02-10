import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { requestCode } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";
import { getResetCode } from "../utils/state";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotResetPasswordCode = useSelector(getResetCode);
  const { values, handleChange } = useForm({ email: "" });

  const submitForgotPasswordForm = (e) => {
    e.preventDefault();
    dispatch(requestCode(values));
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
            onChange={handleChange}
            value={values.email}
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
