import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./login.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.username === "abc" && data.password === "123") {
      localStorage.setItem("isLogin", true);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}></div>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {" "}
              <input
                className={styles.inputArea}
                id="username"
                type="username"
                placeholder="Enter Username"
                {...register("username")}
              />
            </div>
            <div>
              {" "}
              <input
                className={styles.inputArea}
                id="password"
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
            </div>
            <input className={styles.submit} type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
