var express = require("express");
var router = express.Router();
var login = require("../controllers/userControllers");
// import { login } from "../controllers/userControllers";

/* GET users listing. */
router.post("/login", function (req, res, next) {
  return login({ id: req.body.username, password: req.body.password })
    .then((response) => {
      console.log("response on routes: ", response);
      res.send(response);
    })
    .catch((err) => {
      console.log("err in routes: ", err);
      return err;
    });
  // if (req.body.username === "aashish" && req.body.password === "test1234") {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.send(true);
  // } else {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.send(false);
  // }
});

module.exports = router;
