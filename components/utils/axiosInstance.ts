import axios from 'axios'

const baseURL = 'http://192.168.1.21:4000'

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(async req => {
    
})