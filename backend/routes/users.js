var express = require("express");
var router = express.Router();
var userController = require("../controllers/userControllers");

/* GET users listing. */
router.post("/login", function (req, res, next) {
  return userController
    .login({ email: req.body.username, password: req.body.password })
    .then((response) => {
      res.cookie("token", response.token, {
        httpOnly: true,
        secure: true,
        maxAge: 20000,
      });
      res.send(response);
    })
    .catch((err) => {
      res.send({
        status: 500,
        message: err.message,
      });
    });
});

router.post("/add", (req, res, next) => {
  return userController
    .addUser({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    .then((response) => {
      res.json(response).status(response.status);
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    });
});

module.exports = router;
