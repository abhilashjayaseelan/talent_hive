import { combineReducers } from 'redux';
import tokenReducer from '../slices/tokenSlice';
import employerJobsReducer from '../slices/employerJobsSlice';
import employerDetailsReducer from '../slices/employerDetailsSlice';
import allJobReducer from '../slices/getAllJobsSlice';
import jobDetail from '../slices/jobDetailsSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  employerJobs: employerJobsReducer,
  employerDetails: employerDetailsReducer,
  allJobs: allJobReducer,
  jobDetails: jobDetail
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
