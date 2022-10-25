import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    return await axios({
      method: "get",
      url: "http://localho.st:3005/notes",
      headers: {},
    })
      .then(function (response) {
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

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ id, note }) => {
    try {
      return await axios({
        method: "post",
        url: "http://localho.st:3005/notes/add",
        data: {
          id: id,
          note: note,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return {
            data: response.data,
            status: response.status,
          };
        })
        .catch((err) => {
          return {
            data: err.message,
            status: "failed",
          };
        });
    } catch (error) {
      toast.error("Some Error Occured. Please Try Again Later");
      return error.message;
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, note }) => {
    try {
      return await axios({
        method: "post",
        url: "http://localho.st:3005/notes/edit",
        data: {
          id: id,
          note: note,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return {
            status: response.status,
            data: response.data,
          };
        })
        .catch((error) => {
          return {
            status: "failed",
            data: error.message,
          };
        });
    } catch (error) {
      toast(`${error.message}`);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    fetchNotesStatus: "idle", //  "idle" | "loading" | "success" | "failed"
    addNotesStatus: "idle", //  "idle" | "loading" | "success" | "failed"
    editNotesStatus: "idle", //  "idle" | "loading" | "success" | "failed"
    fetchNotesError: null,
    addNotesError: null,
    editNotesError: null,
  },

  reducers: {
    // setNotes: (state, action) => {
    //   state.notes = action.payload;
    // },
    // addNote: (state, action) => {
    //   const newNote = {
    //     id: action.payload.id,
    //     note: action.payload.note,
    //   };
    //   return { ...state, notes: state.notes.concat(newNote) };
    // },
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
        state.fetchNotesStatus = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        console.log("action resp: ", action.payload);
        if (action.payload.status === "failed") {
          console.log("herre");
          state.fetchNotesStatus = "failed";
          state.fetchNotesError = action.payload.data;
          toast.error(`${action.payload.data}`);
        } else {
          console.log("there");
          state.fetchNotesStatus = "success";
          state.notes = action.payload.data;
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.fetchNotesStatus = "failed";
        state.fetchNotesError = action.error.message;
        toast.error(`${action.error.message}`);
      })
      .addCase(addNote.pending, (state, action) => {
        state.addNotesStatus = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        if (action.payload.status === "failed") {
          state.addNotesStatus = "failed";
          state.addNotesError = action.payload.data;
          toast.error(`${action.payload.data}`);
        } else {
          state.addNotesStatus = "success";
          toast.success(`${action.payload.data}`);
        }
      })
      .addCase(addNote.rejected, (state, action) => {
        state.addNotesStatus = "failed";
        toast.error(`${action.error.message}`);
        state.addNotesError = action.error.message;
      })
      .addCase(editNote.pending, (state) => {
        state.editNotesStatus = "loading";
      })
      .addCase(editNote.fulfilled, (state, action) => {
        if (action.payload.status === "failed") {
          state.editNotesStatus = "failed";
          state.editNotesError = action.payload.message;
          toast.error(`${action.payload.data}`);
        } else {
          state.editNotesStatus = "success";
          toast.success(`${action.payload.data}`);
        }
      })
      .addCase(editNote.rejected, (state, action) => {
        state.editNotesStatus = "failed";
        state.editNotesError = action.error.message;
        toast.error(`${action.error.message}`);
      });
  },
});

export const getNotes = (state) => state.notes.notes;
export const getNotesStatus = (state) => state.notes.fetchNotesStatus;
export const getNotesError = (state) => state.notes.fetchNotesError;

export const { setNotes, updateNote } = noteSlice.actions;

export default noteSlice.reducer;
