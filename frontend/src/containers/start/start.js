import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../redux/user/reducer";
import styles from "./start.module.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LoginForm from "../../components/login/login";
import SignUpForm from "../../components/signUp/signUp";

const Start = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [onLogin, setOnLogin] = useState(true);
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
      {onLogin ? (
        <div className={styles.imageContainer}>
          <h1> Image </h1>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <SignUpForm setOnLogin={setOnLogin} onLogin={onLogin} s />
        </div>
      )}
      <div className={styles.divider}>
        <div
          className={styles.icon}
          onClick={() => {
            setOnLogin(!onLogin);
          }}
        >
          {onLogin ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
        </div>
      </div>
      {onLogin ? (
        <div className={styles.loginContainer}>
          <LoginForm setOnLogin={setOnLogin} onLogin={onLogin} />
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <h1> Image </h1>
        </div>
      )}
    </div>
  );
};

export default Start;
