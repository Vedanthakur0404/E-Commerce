import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {fetchAllProducts, fetchByCategories, fetchProductById} from './productAPI'

const initialState = {
    products : [],
    status: 'idle',
    max_length : 10,
    brands : [],
    SelectedProduct : null
}

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (page) => {
    const response = await fetchAllProducts(page);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    console.log(id)
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchByCategoriesAsync = createAsyncThunk(
  'product/fetchByCategories',
  async(param)=>{
    const response = await fetchByCategories(param['categoriesList'], param['page'], param['brands'])
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
          state.products = action.payload['products'];
          state.max_length = action.payload['maxlength']
          state.brands = action.payload['brands'] 
        })
        .addCase(fetchByCategoriesAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchByCategoriesAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload['products'];
          state.max_length = action.payload['maxlength']
          state.brands = action.payload['brands'] 
        })
        .addCase(fetchProductByIdAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.SelectedProduct = action.payload;
          
        })
    },
})
export const {selectAllProducts, showProducts, sort} = productSlice.actions
export default  productSlice.reducer