import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { loginUser } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const { values, handleChange } = useForm({ email: "", password: "" });

  const submitLoginForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(values.email, values.password));
  };

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitLoginForm}>
          <h1 className="text text_type_main-medium">Вход</h1>

          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email !== undefined ? values.email : ""}
            name={"email"}
          />
          <PasswordInput
            onChange={handleChange}
            value={values.password !== undefined ? values.password : ""}
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
