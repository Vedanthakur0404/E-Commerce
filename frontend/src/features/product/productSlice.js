import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {fetchAllProducts, fetchByCategories} from './productAPI'

const initialState = {
    products : [],
    status: 'idle',
}

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchByCategoriesAsync = createAsyncThunk(
  'product/fetchByCategories',
  async(categories)=>{
    const response = await fetchByCategories(categories)
    return response.data
  }
)

export const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers: {
      sort: (state, action) => {
        state.products = action.payload;
      },
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
        })
        .addCase(fetchByCategoriesAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchByCategoriesAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
        })
    },
})
export const {selectAllProducts, showProducts, sort} = productSlice.actions
export default  productSlice.reducer