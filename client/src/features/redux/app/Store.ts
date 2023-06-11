import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/Reducer';

const store = configureStore({
    reducer: rootReducer
})

export default store;