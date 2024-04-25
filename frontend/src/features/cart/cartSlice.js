import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { insertInCart, getItemsFromCart, removeItemsFromCart } from './cartAPI';

const initialState = {
  cart : [],
  size: 0,
  status: 'idle',
};

export const insertInCartsAsync = createAsyncThunk(
  'cart/insertInCart',
  async (params) => {
    const response = await insertInCart(params['user_id'], params['prod_id']);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getItemsFromCartAsync = createAsyncThunk(
  'cart/getItemsFromCart',
  async (user_id) => {
    const response = await getItemsFromCart(user_id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const removeItemsFromCartAsync = createAsyncThunk(
  'cart/removeItemsFromCart',
  async (params) => {
    const response = await removeItemsFromCart(params['user_id'], params['prod_id']);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    getLength: (state)=>{
      state.size = state.cart.length
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(insertInCartsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(insertInCartsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart.push(action.payload);
        state.size += 1
      })
      .addCase(getItemsFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = action.payload;
        state.size = state.cart.length;
      }).
      addCase(removeItemsFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cart = action.payload;
        state.size -= 1

      });
      
  },
});

export const { increment, getLength } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCart = (state) => state.cart.value;



export default cartSlice.reducer;
