import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticateLogin } from "./queries";

export const loginAuth = createAsyncThunk(
  "user/authenticateUser",
  async ({ username, password }) => {
    try {
      return await authenticateLogin({ username, password })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    } catch (err) {
      return err.message;
    }
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
        state.status = "success";
        console.log("success: ", action.payload);
        state.isLoggedIn = action.payload ? true : false;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getLoginStatus = (state) => state.user.isLoggedIn;

// export const { setLogin } = userSlice.actions;

export default userSlice.reducer;
