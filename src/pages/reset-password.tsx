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
import { useForm } from "../hooks/useForm";
import { getResetCode } from "../utils/state";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const gotResetPasswordCode = useSelector(getResetCode);
  const { values, handleChange } = useForm({ password: "", token: "" });

  const submitResetPasswordForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(values.password, values.token));
    navigate("/login");
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
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            value={values.password !== undefined ? values.password : ""}
            name={"password"}
            icon="ShowIcon"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token !== undefined ? values.token : ""}
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
