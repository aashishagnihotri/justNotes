import React from "react";
import Home from "./containers/home/home";
import Start from "./containers/start/start";

import { useSelector } from "react-redux";
import { getLoginStatus } from "./redux/user/reducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const loginStatus = useSelector(getLoginStatus);
  return (
    <div className="appContainer">
      {loginStatus ? <Home /> : <Start />}
      <ToastContainer />
    </div>
  );
};

export default App;
