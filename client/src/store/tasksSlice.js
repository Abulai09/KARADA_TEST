// src/store/tasksSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

const initialState = {
  tasks: [],
  loading: false,
};

// Получить все задачи
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
});

// Создать задачу
export const createTask = createAsyncThunk("tasks/create", async (taskData) => {
  const res = await axiosInstance.post("/tasks", taskData);
  return res.data;
});

// Обновить задачу
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, taskData }) => {
    const res = await axiosInstance.patch(`/tasks/${id}`, taskData);
    return res.data;
  },
);

// Удалить задачу
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await axiosInstance.delete(`/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
