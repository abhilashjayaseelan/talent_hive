import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { employerData } from "../../axios/api/employerDetails";

export const fetchEmployer = createAsyncThunk(
  "employer/fetchEmployer",
  async () => {
    const response = await employerData();
    return response;
  }
);

interface EmployerDetailsState {
  employerDetails: any;
  error: string | null;
  status: string;
}

const initialState: EmployerDetailsState = {
  employerDetails: null,
  error: null,
  status: "idle",
};

const employerDetailsSlice = createSlice({
  name: "employerDetails",
  initialState,
  reducers: {
    clearEmployerDetails: (state) => {
      state.employerDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployer.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.employerDetails = action.payload;
      })
      .addCase(fetchEmployer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearEmployerDetails, setError } = employerDetailsSlice.actions;

export default employerDetailsSlice.reducer;
