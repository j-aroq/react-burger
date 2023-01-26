import { useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { ProfileTabs } from "../components/profile-tabs/profile-tabs";

export function ProfilePage() {
  const [form, setValue] = useState({ email: "", password: "", name: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <ProfileTabs />
        <div className="ml-15">
          <form className={styles.form}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={form.name}
              name={"name"}
              icon="EditIcon"
            />
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={onChange}
              value={form.email}
              name={"email"}
              icon="EditIcon"
            />
            <PasswordInput
              type={"password"}
              onChange={onChange}
              value={form.password}
              name={"password"}
              icon="EditIcon"
            />
            {/* {isDataChanged && ( */}
            <div className={styles.button_container}>
              <Button
                type="secondary"
                size="medium"
                htmlType="button"
                // onClick={onCancelForm}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                htmlType="submit"
                // onClick={onSubmitForm}
              >
                Сохранить
              </Button>
            </div>
            {/* )} */}
          </form>
        </div>
      </div>
    </>
  );
}
