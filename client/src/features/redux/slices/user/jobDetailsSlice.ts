import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { jobDetails } from "../../../axios/api/user/jobDetails";
import { JobsInterface } from "../../../../types/JobInterface";

export const fetchJobDetails = createAsyncThunk(
  "job/fetchJob",
  async (id: string) => {
    if (id) {
      const response = await jobDetails(id);
      return response;
    }
  }
);

interface JobDetailsState {
  jobId: string | null;
  jobDetails: JobsInterface | null;
  error: string | null;
  status: string;
}

const initialState: JobDetailsState = {
  jobId: null,
  jobDetails: null,
  error: null,
  status: "idle",
};

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState,
  reducers: {
    clearJObDetails: (state) => {
      state.jobDetails = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setJobId: (state, action: PayloadAction<string>) => {
      state.jobId = action.payload;
    },
    clearJObId: (state) => {
      state.jobId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobDetails = action.payload;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearJObDetails, setError, setJobId, clearJObId } =
  jobDetailsSlice.actions;

export default jobDetailsSlice.reducer;
