import React from "react";
import Home from "./containers/home/home";
import Start from "./containers/start/start";

import { useSelector } from "react-redux";
import { getLoginStatus } from "./redux/user/reducer";
const App = () => {
  const loginStatus = useSelector(getLoginStatus);

  console.log("login status: ", loginStatus);
  return (
    <div className="appContainer">{loginStatus ? <Home /> : <Start />}</div>
  );
};

export default App;
