import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobsInterface } from '../../../../types/JobInterface';

interface EmployerJobsState {
  employerJobs: JobsInterface[]; 
  change: boolean;  
}

const initialState: EmployerJobsState = {
  employerJobs: [],
  change: false

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
    deleted: (state) => {
      state.change = !state.change;
    }
  },
});

export const { setEmployerJobs, clearEmployerJobs, deleted } = employerJobsSlice.actions;
export default employerJobsSlice.reducer;
