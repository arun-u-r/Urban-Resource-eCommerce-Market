import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice";


export const getProducts = (keyword,price ,currentPage=1) => async (dispatch) => {

    let link = `/api/v1/products?page=${currentPage}`;

    if(keyword) {
        link += `&keyword=${keyword}` //concatenation
    }
    if(price){
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
    }

    try {
        dispatch(productsRequest())
        const {data} = await axios.get(link)
        dispatch(productsSuccess(data))
    } catch (error){
        dispatch(productsFail(error.response.data.message))
    }
}                                                                                                                    