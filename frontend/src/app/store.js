import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice'; // Import the reducer, not the slice
import customerReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer, // Use the reducer here
    customer : customerReducer
  },
});
