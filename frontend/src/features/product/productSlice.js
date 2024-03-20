import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {fetchAllProducts, fetchByCategories} from './productAPI'

const initialState = {
    products : [],
    status: 'idle',
    max_length : 10
}

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (page) => {
    const response = await fetchAllProducts(page);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchByCategoriesAsync = createAsyncThunk(
  'product/fetchByCategories',
  async(param)=>{
    const response = await fetchByCategories(param['categoriesList'], param['page'])
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
          state.products = action.payload['data'];
          state.max_length = action.payload['maxlength']
        })
        .addCase(fetchByCategoriesAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchByCategoriesAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload['data'];
          state.max_length = action.payload['maxlength']
        })
    },
})
export const {selectAllProducts, showProducts, sort} = productSlice.actions
export default  productSlice.reducer