import axios from "axios";
import { useDispatch } from "react-redux";
import { setNotes } from "./reducer";

export const fetchNotesFromAPI = async () => {
  return await axios({
    method: "get",
    url: "http://localho.st:3001/notes",
    headers: {},
  })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
