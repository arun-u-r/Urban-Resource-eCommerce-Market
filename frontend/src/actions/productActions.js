import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice";
import { productFail, productRequest, productSuccess } from "../slices/productSlice";



export const getProducts = (keyword, price, category, rating, currentPage=1) => async (dispatch) => {

    let link = `/api/v1/products?page=${currentPage}`;

    if(keyword) {
        link += `&keyword=${keyword}` //concatenation
    }
    if(price){
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
    }
    if(category){
        link += `&category=${category}`
    }
    if(rating){
        link += `&ratings=${rating}`
    }

    try {
        dispatch(productsRequest())
        const {data} = await axios.get(link)
        dispatch(productsSuccess(data))
    } catch (error){
        dispatch(productsFail(error.response.data.message))
    }
}               


export const getProduct = id => async (dispatch) => {
    try {
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch(productSuccess(data))
    } catch (error){
        dispatch(productFail(error.response.data.message))
    }
}                                                                                                                   