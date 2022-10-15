import axios from "axios";

export const authenticateLogin = async ({ username, password }) => {
  return await axios({
    method: "post",
    url: "http://localho.st:3001/users/login",
    data: {
      username: username,
      password: password,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
