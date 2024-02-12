import axios from "axios"
import { useAuthStore } from "../store/auth"
import {storeToRefs} from "pinia";

export const api = axios.create()


api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const { accessToken , baseUrl} = storeToRefs(authStore)

        config.baseURL = baseUrl.value

         if (accessToken.value) {
            config.headers.Authorization = `Bearer ${accessToken.value}`
        }

        return config
    },
    async (error) => await Promise.reject(error)
)
