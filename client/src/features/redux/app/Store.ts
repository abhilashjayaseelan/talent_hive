// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/Reducer';
import * as reduxThunk from "redux-thunk/extend-redux";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
