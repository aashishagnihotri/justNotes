import React from "react";
import { useForm } from "react-hook-form";
import styles from "./signUp.module.scss";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/user/reducer";

const SignUpForm = ({ setOnLogin, onLogin }) => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      signUp({ name: data.name, email: data.email, password: data.password })
    );
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className={styles.inputArea}
            id="name"
            type="name"
            placeholder="Enter Your Name"
            {...register("name")}
          />
        </div>
        <div>
          <input
            className={styles.inputArea}
            id="email"
            type="email"
            placeholder="Enter Email Id"
            {...register("email")}
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
        <input className={styles.submit} type="submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
