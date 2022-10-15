import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes/reducer";
import userReducer from "./user/reducer";
const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

export default store;
