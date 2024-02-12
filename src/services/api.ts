import axios, { AxiosInstance } from "axios"
import {useAuthStore} from "../store/auth";

export const api: AxiosInstance = axios.create({
  baseURL: "https://test.gnzs.ru/api/v4/"
})


api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const access = authStore?.accessToken
    if (access) {
      config.headers!.Authorization = `Bearer ${access}`
    }
    return config
  },
  async (error) => await Promise.reject(error),
)
