import React from "react";
import { useForm } from "react-hook-form";
import styles from "./signUp.module.scss";

const SignUpForm = ({ setOnLogin, onLogin }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setOnLogin(!onLogin);
  };

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
            id="email"
            type="email"
            placeholder="Enter Email Id"
            {...register("emailId")}
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
