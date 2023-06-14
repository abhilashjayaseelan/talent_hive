import { combineReducers } from 'redux';
import tokenReducer from '../slices/tokenSlice';
import employerJobsReducer from '../slices/employerJobsSlice';
import employerDetailsReducer from '../slices/employerDetailsSlice';

const rootReducer = combineReducers({
  token: tokenReducer,
  employerJobs: employerJobsReducer,
  employerDetails: employerDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
