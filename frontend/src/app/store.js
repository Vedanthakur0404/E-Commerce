import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice'; // Import the reducer, not the slice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer, // Use the reducer here
  },
});
