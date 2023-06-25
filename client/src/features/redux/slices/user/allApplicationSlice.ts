import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAllApplications } from "../../../axios/api/user/userJobApplication";

export const fetchAllUserApplications = createAsyncThunk(
  "applications/fetchAll",
  async () => {
    try {
      const response = await userAllApplications();
      return response.jobApplications;
    } catch (error) {
      throw Error("Error fetching user applications");
    }
  }
);

interface applicationsDetailsState {
  applications: any;
  error: string | null;
  status: string;
}

const initialState: applicationsDetailsState = {
  applications: null,
  error: null,
  status: "idle",
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserApplications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(fetchAllUserApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default applicationsSlice.reducer;
