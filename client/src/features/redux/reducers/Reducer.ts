import {combineReducers} from  'redux';
import tokenReducer from '../slices/tokenSlice';
import employerJobsReducer from '../slices/employerJobsSlice'

const rootReducer = combineReducers({
    token: tokenReducer,
    employerJobs: employerJobsReducer
})

export default rootReducer;

