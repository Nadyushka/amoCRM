import {defineStore} from "pinia"
import {api} from "../services/api"
import {ContentType, ContentTypes} from "../types/content"
import {AxiosError} from "axios";


export const useContentStore = defineStore("content", {
    state: () => ({
        isLoading: false,
        leads: [] as ContentType[],
        contacts: [] as ContentType[],
        companies: [] as ContentType[],
        error: null as null | string

    }),

    actions: {
        async createContent(type: ContentTypes, title: string) {
            try {
                this.isLoading = true

                const payload = [{
                    "name": title,
                }]

                const res = await api.post(`${type}`, payload)

                this[type] = [...res.data?.['_embedded'][type], ...this[type]]

            } catch (e: unknown) {

                const error = e as AxiosError
                if (error.response.data?.detail === "Request data can not be empty") {
                    this.error = 'Необходимо ввести наименование'
                } else {
                    this.error = error.response.data.detail
                }
            } finally {
                this.isLoading = false
            }
        },
    },
});
