var dbFunctions = require("../config/dbConfig");
var middleware = require("../middlewares/middleware");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const login = async ({ email, password }) => {
  return await middleware
    .authenticateLogin({
      email,
      password,
    })
    .then((result) => {
      if (result.status === 200) {
        return middleware.generateToken({ userId: result.userId });
      } else {
        return result;
      }
    })
    .catch((error) => {
      return {
        status: 500,
        message: error.message,
      };
    });
};

const addUser = ({ name, email, password }) => {
  const salt = bcrypt.genSaltSync();
  const hashedPwd = bcrypt.hashSync(password, salt);
  return dbFunctions
    .connectToDB()
    .then(async (db) => {
      return db
        .collection("Users")
        .insertOne({
          id: crypto.randomUUID(),
          name: name,
          email: email,
          password: hashedPwd,
        })
        .then((response) => {
          if (response) {
            return {
              status: 200,
              message: "Registered New User!",
            };
          } else {
            return {
              status: 500,
              message: "Some Error Occured. Please Try Again Later!",
            };
          }
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

module.exports = { login, addUser };
