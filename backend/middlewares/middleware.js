var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../config/config.json");
const dbFunctions = require("../config/dbConfig");

var generateToken = async function ({ userId }) {
  const token = await jwt.sign({ userId: userId }, config.secret, {
    expiresIn: config.tokenLife,
  });
  const refreshToken = await jwt.sign(
    { userId: userId },
    config.refreshTokenSecret,
    {
      expiresIn: config.refreshTokenLife,
    }
  );
  const response = {
    token: token,
    refreshToken: refreshToken,
    status: "Logged-In",
  };
  return response;
};

var authenticateLogin = function ({ email, password }) {
  return dbFunctions
    .connectToDB()
    .then(async (db) => {
      return await db
        .collection("Users")
        .findOne({ email: email })
        .then((user) => {
          if (user) {
            return bcrypt.compareSync(password, user.password)
              ? { status: 200, userId: user.id, message: "Authenticated!" }
              : {
                  status: 403,
                  message: "Incorrect Credentials",
                };
          }
          return {
            status: 500,
            message: "Some Error Occured!",
          };
        })
        .catch((error) => {
          return {
            status: 500,
            message: error.message,
          };
        });
    })
    .finally(() => {
      dbFunctions.closeConnect();
    });
};
module.exports = { authenticateLogin, generateToken };
