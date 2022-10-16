import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./loginForm.module.scss";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../redux/user/reducer";

const LoginForm = ({ setOnLogin, onLogin }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState } = useForm();
  const [user, setUser] = useState(null);
  const onSubmit = (data) => {
    console.log(data, "onSubmit");
    setUser(data);
  };
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      dispatch(loginAuth({ username: user.username, password: user.password }));
      // dispatch(setLogin({ username: user.username, password: user.password }));
    }
  }, [user]);
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={styles.inputArea}
            id="username"
            type="username"
            placeholder="Enter Username"
            {...register("username")}
          />
        </div>
        <div>
          <input
            className={styles.inputArea}
            id="password"
            type="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
          />
        </div>
        <span>
          <input className={styles.submit} type="submit" />
          <p>
            New to Just Notes?{" "}
            <span
              onClick={() => {
                setOnLogin(!onLogin);
              }}
            >
              Sign Up
            </span>
          </p>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
