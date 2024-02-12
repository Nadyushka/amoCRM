import axios from "axios"
import {useAuthStore} from "../store/auth"

export const api = axios.create()


api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const access = authStore?.accessToken

        config.baseURL = authStore.baseUrl

        if (access) {
            config.headers.Authorization = `Bearer ${access}`
        }
        return config
    },
    async (error) => await Promise.reject(error)
)
