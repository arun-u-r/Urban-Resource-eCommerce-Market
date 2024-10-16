import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice.js';
import productReducer from '../slices/productSlice.js';
import authReducer from '../slices/authSlice.js'
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
 productsState: productsReducer,
 productState: productReducer,
 authState: authReducer,
 
})

const store = configureStore({
    reducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})


export default store;