// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  loading: false,
  error: null,
};

// Регистрация
export const registerUser = createAsyncThunk(
  "auth/registration",
  async (data) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data; // ожидаем { token, username }
  },
);

// Логин
export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data; // { token, username }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("username", action.payload.username);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
