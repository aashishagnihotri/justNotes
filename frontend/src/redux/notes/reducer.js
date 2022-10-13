import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotesFromAPI } from "./queries";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    return await fetchNotesFromAPI()
      .then((response) => {
        return [...response];
      })
      .catch((err) => {
        return err.message;
      });
  } catch (error) {
    return error.message;
  }
});

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    status: "idle", //  "idle" | "loading" | "success" | "failed"
    error: null,
  },

  reducers: {
    // setNotes: (state, action) => {
    //   state.notes = action.payload;
    // },
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

  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export const { setNotes, updateNote, addNote } = noteSlice.actions;

export default noteSlice.reducer;
