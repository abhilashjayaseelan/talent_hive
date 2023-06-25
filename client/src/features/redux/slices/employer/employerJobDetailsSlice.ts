import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { JobsInterface } from "../../../../types/JobInterface";
import { jobDetailsEmployer } from "../../../axios/api/employer/jobDetailsEmployer";

export const fetchEmployerJobDetails = createAsyncThunk(
  "employerJob/fetchJob",
  async (id: string) => {
    if (id) {
      const response = await jobDetailsEmployer(id);
      return response;
    }
  }
);

interface EmployerJobDetailsSlice {
  jobId: string | null;
  jobDetails: JobsInterface | null;
  error: string | null;
  status: string;
}

const initialState: EmployerJobDetailsSlice = {
  jobId: null,
  jobDetails: null,
  error: null,
  status: "idle",
};

const employerJobDetailsSlice = createSlice({
  name: "employerJobDetails",
  initialState,
  reducers: {
    clearEmployerJobDetails: (state) => {
      state.jobDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setEmployerJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
    clearEmployerJobId: (state) => {
      state.jobId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerJobDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployerJobDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobDetails = action.payload;
      })
      .addCase(fetchEmployerJobDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "";
      });
  },
});

export const {
  clearEmployerJobDetails,
  setError,
  setEmployerJobId,
  clearEmployerJobId,
} = employerJobDetailsSlice.actions;

export default employerJobDetailsSlice.reducer;