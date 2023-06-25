import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allJobs } from "../../../axios/api/user/jobDetails";

export const fetchAllJobs = createAsyncThunk("jobs/fetchAll", async () => {
  try {
    const response = await allJobs();
    return response.allJobs;
  } catch (error) {
    throw Error("Error fetching jobs");
  }
});

interface jobDetailsState {
  jobs: any;
  error: string | null;
  status: string;
}

const initialState: jobDetailsState = {
  jobs: null,
  error: null,
  status: "idle",
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default jobsSlice.reducer;
