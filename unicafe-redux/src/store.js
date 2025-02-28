import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,  // ✅ Wrap inside an object with a key
  },
});

export default store;
