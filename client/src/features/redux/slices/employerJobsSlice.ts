import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobsInterface } from '../../../types/JobInterface';

interface EmployerJobsState {
  employerJobs: JobsInterface[]; 
}

const initialState: EmployerJobsState = {
  employerJobs: [],
};

const employerJobsSlice = createSlice({
  name: "employerJobs",
  initialState,
  reducers: {
    setEmployerJobs: (state, action: PayloadAction<JobsInterface[]>) => {
      state.employerJobs = action.payload;
    },
    clearEmployerJobs: (state) => {
      state.employerJobs = [];
    },
  },
});

export const { setEmployerJobs, clearEmployerJobs } = employerJobsSlice.actions;
export default employerJobsSlice.reducer;
