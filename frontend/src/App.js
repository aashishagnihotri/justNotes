import React, { useState, useEffect } from "react";
import Home from "./containers/home/home";
import Start from "./containers/start/start";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getLoginStatus } from "./redux/user/reducer";
import { useSelector } from "react-redux";
require("dotenv").config();

const App = () => {
  const navigate = useNavigate();
  const loginStatus = useSelector(getLoginStatus);
  useEffect(() => {
    console.log(loginStatus);
    if (loginStatus) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [loginStatus]);
  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Start />} />
      </Routes>
    </div>
  );
};

export default App;
