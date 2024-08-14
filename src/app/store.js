import { configureStore } from '@reduxjs/toolkit';
import fibonacciReducer from '../features/fibonacciSlice';

export const store = configureStore({
  reducer: {
    fibonacci: fibonacciReducer,
  },
});
