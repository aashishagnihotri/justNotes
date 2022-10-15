var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/login", function (req, res, next) {
  if (req.body.username === "aashish" && req.body.password === "test1234") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(true);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(false);
  }
});

module.exports = router;
