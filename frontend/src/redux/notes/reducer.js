import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    return await axios({
      method: "get",
      url: "http://localho.st:3001/notes",
      headers: {},
    })
      .then(async function (response) {
        return { data: response.data, status: response.status };
      })
      .catch(function (error) {
        return { data: error.message, status: "failed" };
      });
  } catch (error) {
    toast.error("Some Error Occured. Please Try Again Later");
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
        if (action.payload.status === "failed") {
          toast(`${action.payload.data}`);
        } else {
          state.status = "success";
          state.notes = action.payload;
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast(`${action.error.message}`);
      });
  },
});

export const getNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.status;
export const getNotesError = (state) => state.notes.error;

export const { setNotes, updateNote, addNote } = noteSlice.actions;

export default noteSlice.reducer;
