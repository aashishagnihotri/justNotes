import axios from "axios";

export const fetchNotesFromAPI = async () => {
  return await axios({
    method: "get",
    url: "http://localho.st:3001/notes",
    headers: {},
  })
    .then(async function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.message;
    });
};
