import React, { useState, useEffect } from "react";
import Home from "./containers/home/home";
import Start from "./containers/start/start";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const loginStatus = localStorage.getItem("accessToken");
  return (
    <div className="appContainer">
      {loginStatus ? <Home /> : <Start />}
      <ToastContainer />
    </div>
  );
};

export default App;
