import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles-form.module.css";
import { registerUser } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";

export function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange,  } = useForm({ email: "", password: "", name: "" });

  const submitRegistrationForm = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitRegistrationForm}>
          <h1 className="text text_type_main-medium">Регистрация</h1>

          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
          />
          <PasswordInput
            type={"password"}
            onChange={handleChange}
            value={values.password}
            name={"password"}
            icon="ShowIcon"
          />
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default">
          Уже зарегистрированы?
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
