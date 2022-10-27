import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSignUpStatus, loginAuth } from "../../redux/user/reducer";
import styles from "./start.module.scss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LoginForm from "../../components/login/login";
import SignUpForm from "../../components/signUp/signUp";
// import { Tooltip } from "@mui/material";
// import HoverComponent from "../../components/hover/hover";

// const ClickToFlip = React.forwardRef((props, ref) => {
//   //  Spread the props to the underlying DOM element.
//   console.debug("tooltip content: ", props, ref);
//   return (
//     <div {...props} ref={ref}>
//       Click to Flip
//     </div>
//   );
// });

const Start = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [onLogin, setOnLogin] = useState(true);
  const signUpStatus = useSelector(getSignUpStatus);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      dispatch(loginAuth({ username: user.username, password: user.password }));
      // dispatch(setLogin({ username: user.username, password: user.password }));
    }
  }, [user]);

  useEffect(() => {
    if (signUpStatus === "success") {
      setOnLogin(true);
    }
  }, [signUpStatus]);
  return (
    <div className={styles.container}>
      {onLogin ? (
        <div className={styles.imageContainer}>Image</div>
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
          {onLogin ? (
            <ArrowCircleLeftIcon className={styles.icon} />
          ) : (
            <ArrowCircleRightIcon className={styles.icon} />
          )}
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
