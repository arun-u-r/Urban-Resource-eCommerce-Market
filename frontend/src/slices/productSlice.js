import { createSlice } from "@reduxjs/toolkit";
0
const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {}
  },
  reducers: {
    // Add your reducers here
    productRequest : (state) =>  {
      state.loading = true;
    },
    productSuccess : (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
    },
    productFail : (state, action) =>  {
        state.loading = false;
        state.error = action.payload;
    },
  },
});


const {actions, reducer} = productSlice;

export const {productRequest, productSuccess, productFail} = actions;

export default reducer;