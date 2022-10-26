var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var authenticateLogin = function ({ password }) {
  return password;
};

module.exports = { authenticateLogin };
