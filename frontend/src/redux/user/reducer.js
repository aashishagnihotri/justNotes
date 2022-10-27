import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loginAuth = createAsyncThunk(
  "user/authenticateUser",
  async ({ username, password }) => {
    return await axios({
      method: "post",
      url: "http://localho.st:3005/users/login",
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

export const signUp = createAsyncThunk(
  "user/addUser",
  async ({ name, email, password }) => {
    return await axios({
      method: "post",
      url: "http://localhost:3005/users/add",
      data: {
        name: name,
        email: email,
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
    user: {},
    userLoginStatus: "idle", //  "idle" | "loading" | "success" | "failed"
    signUpStatus: "idle", //  "idle" | "loading" | "success" | "failed"
    loginError: null,
    signUpError: null,
  },
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(loginAuth.pending, (state, action) => {
        state.userLoginStatus = "loading";
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        if (action.payload.data.status === "Logged-In") {
          localStorage.setItem("accessToken", action.payload.data.token);
          localStorage.setItem(
            "refreshToken",
            action.payload.data.refreshToken
          );
          state.userLoginStatus = "success";
          toast.success("Welcome!");
        } else {
          state.userLoginStatus = "failed";
          toast.error(`${action.payload.data.message}`);
        }
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.userLoginStatus = "failed";
        toast(`${action.error.message}`);
        state.loginError = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.signUpStatus = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.data.status === 200) {
          toast.success("Sign Up Successfully Completed!");
          state.signUpStatus = "success";
        } else {
          toast.error("Some Error Occured! Please Try Again Later.");
          state.signUpStatus = "failed";
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpStatus = "failed";
        toast(`${action.error.message}`);
        state.signUpError = action.error.message;
      });
  },
});

export const getSignUpStatus = (state) => state.user.signUpStatus;

export default userSlice.reducer;
