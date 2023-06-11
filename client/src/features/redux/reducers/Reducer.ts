import {combineReducers} from  'redux';
import tokenReducer from '../slices/tokenSlice';

const rootReducer = combineReducers({
    token: tokenReducer
})

export default rootReducer;

