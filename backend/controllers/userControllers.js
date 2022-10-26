var main = require("../config/dbConfig");

const login = ({ id, password }) => {
  return main()
    .then(async (db) => {
      return await db
        .collection("Users")
        .findOne({ username: id, password: password })
        .then((user) => {
          console.log("response from db: ", user);
          return user;
        })
        .catch((error) => {
          return error;
        });
    })
    .catch((err) => {
      return err;
    });
};

module.exports = login;
