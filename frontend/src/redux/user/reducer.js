import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loginAuth = createAsyncThunk(
  "user/authenticateUser",
  async ({ username, password }) => {
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
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        return {
          status: "failed",
          data: error.message,
        };
      });
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {},
    status: "idle", //  "idle" | "loading" | "success" | "failed"
    error: null,
  },
  reducers: {
    // setLogin: (state, action) => {
    //   return {
    //     ...state,
    //     user: action.payload,
    //     // isLoggedIn: true,
    //   };
    // },
  },

  extraReducers(builder) {
    builder
      .addCase(loginAuth.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        if (action.payload.status === "failed") {
          toast.error(`${action.payload.data}`);
        } else {
          state.status = "success";
          action.payload.data === false
            ? toast.warning(`Incorrect Credentials. Please Try Again!`)
            : (state.isLoggedIn = action.payload.data);
        }
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.status = "failed";
        toast(`${action.error.message}`);
        state.error = action.error.message;
      });
  },
});

export const getLoginStatus = (state) => state.user.isLoggedIn;

// export const { setLogin } = userSlice.actions;

export default userSlice.reducer;
