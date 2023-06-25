import { combineReducers } from 'redux';
import tokenReducer from '../slices/user/tokenSlice';
import employerJobsReducer from '../slices/employer/employerJobsSlice';
import employerDetailsReducer from '../slices/employer/employerDetailsSlice';
import allJobReducer from '../slices/user/getAllJobsSlice';
import jobDetailReducer from '../slices/user/jobDetailsSlice';
import employerJobDetailReducer from '../slices/employer/employerJobDetailsSlice';
import employerTokenReducer from '../slices/employer/employerTokenSlice';
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice';
import userDetailsReducer from '../slices/user/userDetailsSlice';
import userAllApplicationReducer from '../slices/user/allApplicationSlice';
import userApplicationDetailsReducer from '../slices/user/userApplicationDetailsSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  employerToken: employerTokenReducer,
  employerJobs: employerJobsReducer,
  employerDetails: employerDetailsReducer,
  allJobs: allJobReducer,
  jobDetails: jobDetailReducer,
  employerJobDetails: employerJobDetailReducer,
  userAuth: userLoginAuthReducer,
  userDetails: userDetailsReducer,
  userApplications: userAllApplicationReducer,
  applicationDetails: userApplicationDetailsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
