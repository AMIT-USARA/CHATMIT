import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:"http://localhost:4003/api",
    withCredentials:true,
})