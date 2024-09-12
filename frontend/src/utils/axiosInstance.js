import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://127.0.0.1:5005",
    headers: {
        'Cache-control' : 'no-cache',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
    }
})

export default axiosInstance; 