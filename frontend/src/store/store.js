import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice.js';
import productReducer from '../slices/productSlice.js';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
 productsState: productsReducer,
 productState: productReducer
})

const store = configureStore({
    reducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})


export default store;