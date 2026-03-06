import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "./studentService";

const initialState = {
  students: [],
  isLoading: false,
  isError: false,
  message: "",
};

// GET ALL
export const getStudents = createAsyncThunk(
  "student/getAll",
  async (_, thunkAPI) => {
    try {
      return await studentService.getStudents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// ADD
export const addStudent = createAsyncThunk(
  "student/add",
  async (studentData, thunkAPI) => {
    try {
      return await studentService.addStudent(studentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// DELETE
export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (id, thunkAPI) => {
    try {
      return await studentService.deleteStudent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.meta.arg
        );
      });
  },
});

export default studentSlice.reducer;
