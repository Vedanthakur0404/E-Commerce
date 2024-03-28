import { configureStore, createReducer } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
// import productReducer from '../features/product/productSlice'; // Import the reducer, not the slice
import authSlice from '../features/auth/authSlice';
import productSlice from '../features/product/productSlice';
import cartSlice from '../features/cart/cartSlice';
import checkOutSlice from '../features/checkOut/checkOutSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productSlice, // Use the reducer here
    customer : authSlice,
    cart :  cartSlice,
    checkout:checkOutSlice
  },
});
