import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { ProfileTabs } from "../components/profile-tabs/profile-tabs";
import { patchUserInfo } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";
import { getUser } from "../utils/state";

export function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const passwordFormValue = "******";
  const { values, setValues } = useForm({
    email: user.email,
    password: passwordFormValue,
    name: user.name,
  });
  const [isDataChanged, setIsDataChanged] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setIsDataChanged(true);
  };

  const submitForm = () => {
    dispatch(
      patchUserInfo({
        email: values.email,
        name: values.name,
        password:
          values.password !== passwordFormValue ? values.password : "Qwerty",
      })
    );
    setIsDataChanged(false);
  };

  const cancelForm = () => {
    setValues({
      email: user.email,
      name: user.name,
      password: passwordFormValue,
    });
    setIsDataChanged(false);
  };

  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <AppHeader />
      <div className={styles.container}>
        <ProfileTabs
          text={"В этом разделе вы можете изменить свои персональные данные"}
        />
        <div className="ml-15">
          <form className={styles.form}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={values.name}
              name={"name"}
              icon="EditIcon"
            />
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={onChange}
              value={values.email}
              name={"email"}
              icon="EditIcon"
            />
            <PasswordInput
              type={"password"}
              onChange={onChange}
              value={values.password}
              name={"password"}
              icon="EditIcon"
            />
            {isDataChanged && (
              <div className={styles.button_container}>
                <Button
                  type="secondary"
                  size="medium"
                  htmlType="button"
                  onClick={cancelForm}
                >
                  Отмена
                </Button>
                <Button
                  type="primary"
                  size="medium"
                  htmlType="submit"
                  onClick={submitForm}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
