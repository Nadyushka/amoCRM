import axios from "axios"
import {useAuthStore} from "../store/auth"

export const api = axios.create({
    baseURL: 'https://rmxtfurm45mw01.amocrm.ru/api/v4'
})


api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        const access = authStore?.accessToken

         if (access) {
            config.headers.Authorization = `Bearer ${access}`
        }
        return config
    },
    async (error) => await Promise.reject(error)
)
