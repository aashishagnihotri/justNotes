import React, { useEffect } from "react";
import Home from "./containers/home/home";
import Login from "./containers/login/login";

// import { Routes, Route } from "react-router-dom";
const App = () => {
  const isLoggedIn = localStorage.getItem("isLogin");
  return (
    <div className="appContainer">
      {isLoggedIn ? <Home /> : <Login />}
      {/* <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
      </Routes> */}
    </div>
  );
};

export default App;
