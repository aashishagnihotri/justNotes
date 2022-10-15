import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../redux/user/reducer";
import styles from "./login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { register, handleSubmit, watch, formState } = useForm();

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
