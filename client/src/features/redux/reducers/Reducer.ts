import { combineReducers } from 'redux';
import tokenReducer from '../slices/tokenSlice';
import employerJobsReducer from '../slices/employerJobsSlice';
import employerDetailsReducer from '../slices/employerDetailsSlice';
import allJobReducer from '../slices/getAllJobsSlice';
import jobDetailReducer from '../slices/jobDetailsSlice';
import employerJobDetailReducer from '../slices/employerJobDetailsSlice';
import employerTokenReducer from '../slices/employerTokenSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  employerToken: employerTokenReducer,
  employerJobs: employerJobsReducer,
  employerDetails: employerDetailsReducer,
  allJobs: allJobReducer,
  jobDetails: jobDetailReducer,
  employerJobDetails: employerJobDetailReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
