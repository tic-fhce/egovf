import axios from 'axios'
import store from '@/store'
import { API_IP} from "@env";
const ipUrl = API_IP;

const axiosInstance = axios.create({
    baseURL: ipUrl // Tu URL
})

// Interceptor para requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getters['auth/getToken']
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            // Renovar el timeout en cada request
            if (store.getters['auth/isAuthenticated']) {
                store.dispatch('auth/resetSessionTimeout')
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor para responses
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch('auth/logout')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance