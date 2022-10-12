import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes/reducer";
const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;
