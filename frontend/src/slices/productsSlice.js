import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
  },
  reducers: {
    //  reducers===
    productsRequest : (state) =>  {
      state.loading = true;
    },
    productsSuccess : (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.count;
        state.resultPerPage = action.payload.resultPerPage;

    },
    productsFail : (state, action) =>  {
        state.loading = false;
        state.error = action.payload;
    },
  },
});


const {actions, reducer} = productsSlice;

export const {productsRequest, productsSuccess, productsFail} = actions;

export default reducer;