import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {},

  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    getNotes: (state) => state,
    addNote: (state, action) => {
      const newNote = {
        id: action.payload.id,
        note: action.payload.note,
      };
      return { ...state, notes: state.notes.concat(newNote) };
    },
    updateNote: (state, action) => {
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.payload.id) {
            return { ...note, note: action.payload.note };
          } else {
            return note;
          }
        }),
      };
    },
  },
});

export const { setNotes, getNotes, updateNote, addNote } = noteSlice.actions;

export default noteSlice.reducer;
